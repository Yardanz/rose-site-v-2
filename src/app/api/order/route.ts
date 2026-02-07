import { NextResponse } from "next/server";

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;
const ALLOWED_MIME_PREFIX = "image/";

export async function POST(request: Request) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "DISCORD_WEBHOOK_URL is not set." },
      { status: 500 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid form data." },
      { status: 400 },
    );
  }

  const discord = formData.get("discord");
  const notes = formData.get("notes");
  const image = formData.get("image");

  if (typeof discord !== "string" || discord.trim() === "") {
    return NextResponse.json(
      { error: "Discord is required." },
      { status: 400 },
    );
  }

  if (!(image instanceof File)) {
    return NextResponse.json(
      { error: "Image is required." },
      { status: 400 },
    );
  }

  if (!image.type.startsWith(ALLOWED_MIME_PREFIX)) {
    return NextResponse.json(
      { error: "Only image files are allowed." },
      { status: 400 },
    );
  }

  if (image.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json(
      { error: "File is too large (max 8 MB)." },
      { status: 400 },
    );
  }

  const lines = [
    "New order",
    `Discord: ${discord.trim()}`,
    typeof notes === "string" && notes.trim() ? `Notes: ${notes.trim()}` : null,
  ].filter(Boolean);

  const webhookPayload = {
    content: lines.join("\n"),
  };

  const webhookForm = new FormData();
  webhookForm.append("payload_json", JSON.stringify(webhookPayload));
  webhookForm.append("file", image, image.name || "image");

  const response = await fetch(webhookUrl, {
    method: "POST",
    body: webhookForm,
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to send request to Discord." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
