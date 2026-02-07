import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

const getSupabaseHeaders = () => ({
  apikey: SUPABASE_SERVICE_ROLE_KEY as string,
  Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  "Content-Type": "application/json",
});

const describeKey = (value?: string) => {
  if (!value) return "missing";
  const prefix = value.slice(0, 6);
  const suffix = value.slice(-4);
  return `${prefix}...${suffix} (len=${value.length})`;
};

export async function PATCH(request: Request) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !ADMIN_TOKEN) {
    return NextResponse.json(
      { error: "Server environment variables are missing." },
      { status: 500 },
    );
  }

  console.info("[reviews:admin] env", {
    supabaseUrl: SUPABASE_URL,
    service: describeKey(SUPABASE_SERVICE_ROLE_KEY),
  });

  const auth = request.headers.get("authorization") ?? "";
  const token = auth.replace("Bearer ", "").trim();
  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let payload: { id?: string; status?: "approved" | "rejected" };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!payload.id || !payload.status) {
    return NextResponse.json(
      { error: "id and status are required." },
      { status: 400 },
    );
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/site_reviews?id=eq.${payload.id}`,
    {
      method: "PATCH",
      headers: {
        ...getSupabaseHeaders(),
        Prefer: "return=representation",
      },
      body: JSON.stringify({ status: payload.status }),
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to update review." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
