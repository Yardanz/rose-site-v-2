import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

const MIN_NICKNAME = 2;
const MAX_NICKNAME = 32;
const MIN_BODY = 10;
const MAX_BODY = 500;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

const getSupabaseHeaders = () => ({
  apikey: SUPABASE_ANON_KEY as string,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
});

const describeKey = (value?: string) => {
  if (!value) return "missing";
  const prefix = value.slice(0, 6);
  const suffix = value.slice(-4);
  return `${prefix}...${suffix} (len=${value.length})`;
};

export async function GET() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return NextResponse.json(
      {
        error:
          "Supabase environment variables are missing (SUPABASE_URL + SUPABASE_ANON_KEY).",
      },
      { status: 500 },
    );
  }

  console.info("[reviews:GET] env", {
    supabaseUrl: SUPABASE_URL,
    anon: describeKey(SUPABASE_ANON_KEY),
  });

  const url =
    `${SUPABASE_URL}/rest/v1/site_reviews` +
    `?select=id,created_at,nickname,body,status` +
    `&status=eq.approved` +
    `&order=created_at.desc`;

  const response = await fetch(url, {
    headers: getSupabaseHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorJson: unknown = null;
    try {
      errorJson = JSON.parse(errorText);
    } catch {
      errorJson = null;
    }

    const supabaseError =
      typeof errorJson === "object" && errorJson !== null
        ? (errorJson as { code?: string; message?: string })
        : null;
    if (supabaseError?.code || supabaseError?.message) {
      console.info("[reviews:GET] supabase error", {
        code: supabaseError.code,
        message: supabaseError.message,
      });
    }

    return NextResponse.json(
      {
        error: "Failed to load reviews.",
        supabase: supabaseError
          ? { code: supabaseError.code, message: supabaseError.message }
          : errorJson ?? errorText,
      },
      { status: response.status },
    );
  }

  const data = await response.json();
  return NextResponse.json({ reviews: data });
}

export async function POST(request: Request) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !TURNSTILE_SECRET_KEY) {
    return NextResponse.json(
      {
        error:
          "Server environment variables are missing (SUPABASE_URL + SUPABASE_ANON_KEY + TURNSTILE_SECRET_KEY).",
      },
      { status: 500 },
    );
  }

  console.info("[reviews:POST] HIT submit review");

  console.info("[reviews:POST] env", {
    supabaseUrl: SUPABASE_URL,
    anon: describeKey(SUPABASE_ANON_KEY),
    turnstileSecret: describeKey(TURNSTILE_SECRET_KEY),
  });

  let payload: {
    nickname?: string;
    body?: string;
    token?: string;
  };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const nickname = payload.nickname?.trim() ?? "";
  const body = payload.body?.trim() ?? "";
  const token = payload.token?.trim() ?? "";

  console.info("[reviews:POST] token present?", Boolean(token));

  if (!nickname || !body || !token) {
    return NextResponse.json(
      { error: "Nickname, body and Turnstile token are required." },
      { status: 400 },
    );
  }

  if (
    nickname.length < MIN_NICKNAME ||
    nickname.length > MAX_NICKNAME ||
    body.length < MIN_BODY ||
    body.length > MAX_BODY
  ) {
    return NextResponse.json(
      {
        error: `Nickname must be ${MIN_NICKNAME}-${MAX_NICKNAME} chars and review must be ${MIN_BODY}-${MAX_BODY} chars.`,
      },
      { status: 400 },
    );
  }

  const turnstileForm = new URLSearchParams();
  turnstileForm.append("secret", TURNSTILE_SECRET_KEY);
  turnstileForm.append("response", token);

  const turnstileResponse = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: turnstileForm.toString(),
    },
  );

  const turnstileData: { success: boolean } = await turnstileResponse.json();

  if (!turnstileData.success) {
    return NextResponse.json(
      { error: "Turnstile verification failed." },
      { status: 400 },
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwardedFor.split(",")[0]?.trim();
  const ipHash = ip
    ? createHash("sha256").update(ip).digest("hex")
    : null;

  const rpcPayload = {
    p_nickname: nickname,
    p_body: body,
    p_ip_hash: ipHash,
  };

  console.info("[reviews:POST] rpc payload keys", Object.keys(rpcPayload));

  const insertResponse = await fetch(
    `${SUPABASE_URL}/rest/v1/rpc/insert_site_review`,
    {
      method: "POST",
      headers: {
        ...getSupabaseHeaders(),
      },
      body: JSON.stringify(rpcPayload),
    },
  );

  if (!insertResponse.ok) {
    const errorText = await insertResponse.text();
    let errorJson: unknown = null;
    try {
      errorJson = JSON.parse(errorText);
    } catch {
      errorJson = null;
    }

    const supabaseError =
      typeof errorJson === "object" && errorJson !== null
        ? (errorJson as { code?: string; message?: string })
        : null;
    if (supabaseError?.code || supabaseError?.message) {
      console.info("[reviews:POST] supabase error", {
        code: supabaseError.code,
        message: supabaseError.message,
      });
    }

    const status = insertResponse.status;

    return NextResponse.json(
      {
        error: "Failed to save review.",
        supabase: supabaseError
          ? { code: supabaseError.code, message: supabaseError.message }
          : errorJson ?? errorText,
      },
      { status },
    );
  }

  return NextResponse.json({ ok: true });
}
