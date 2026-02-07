"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/Buttons";

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;

type FormState = "idle" | "submitting" | "success";

type FormValues = {
  discord: string;
  notes: string;
};

type OrderClientProps = {
  selectedProductTitle: string | null;
};

// TODO: place payment icons into public/payment/{card,paypal,usdt}.webp
const paymentMethods = [
  { label: "Card", src: "/payment/card.webp" },
  { label: "PayPal", src: "/payment/paypal.webp" },
  { label: "USDT", src: "/payment/usdt.webp" },
];

export default function OrderClient({
  selectedProductTitle,
}: OrderClientProps) {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [values, setValues] = useState<FormValues>({
    discord: "",
    notes: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((prev) => {
      if (name === "discord") return { ...prev, discord: value };
      if (name === "notes") return { ...prev, notes: value };
      return prev;
    });
  };

  const clearFileInput = () => {
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFiles = (files: FileList | null) => {
    setError(null);

    if (!files || files.length === 0) {
      clearFileInput();
      return;
    }

    if (files.length > 1) {
      setError("Please select only one file.");
      clearFileInput();
      return;
    }

    const file = files[0];
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      clearFileInput();
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError("File is too large (max 8 MB).");
      clearFileInput();
      return;
    }

    setImageFile(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const openFilePicker = () => {
    if (state !== "idle") return;
    fileInputRef.current?.click();
  };

  const handleTryAgain = () => {
    setError(null);
    setState("idle");
    clearFileInput();
  };

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [imageFile]);

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    const kb = size / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!values.discord.trim() || !imageFile) {
      setError("Please enter your Discord and select an image.");
      return;
    }

    setState("submitting");

    try {
      const formData = new FormData();
      formData.append("discord", values.discord.trim());
      formData.append("notes", values.notes.trim());
      formData.append("image", imageFile);

      const response = await fetch("/api/order", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      setState("success");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setError(message);
      setState("idle");
    }
  };

  if (state === "success") {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-16">
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10">
          <h1 className="text-3xl font-semibold">Thanks!</h1>
          <p className="mt-3 text-sm text-[var(--muted)]">
            I&apos;ll contact you on Discord soon.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/gallery">View gallery</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/">Back home</Link>
            </Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10">
        <h1 className="text-3xl font-semibold">Order</h1>
        <p className="mt-3 max-w-2xl text-sm text-[var(--muted)]">
          Leave your contact and image. I will reach out on Discord.
        </p>
        {selectedProductTitle ? (
          <div className="mt-4 rounded-2xl border border-[var(--border)] bg-black/10 px-4 py-3 text-sm text-[var(--muted)]">
            Selected pack:{" "}
            <span className="text-[var(--text)]">{selectedProductTitle}</span>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            Discord username
            <input
              name="discord"
              required
              value={values.discord}
              onChange={handleChange}
              disabled={state !== "idle"}
              className="rounded-2xl border border-[var(--border)] bg-black/20 px-4 py-3 text-sm outline-none focus:border-[var(--gold)]"
              placeholder="@username"
            />
          </label>

          <div className="flex flex-col gap-2 text-sm">
            <span>Image file</span>
            <div
              role="button"
              tabIndex={0}
              onClick={openFilePicker}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openFilePicker();
                }
              }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`flex min-h-[140px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-4 py-6 text-center transition ${
                isDragging
                  ? "border-[var(--gold)] bg-white/5"
                  : "border-[var(--border)] bg-black/10"
              } ${state !== "idle" ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                required
                onChange={handleFileChange}
                disabled={state !== "idle"}
                className="hidden"
              />
              <p className="text-sm">
                Drag & drop an image here, or click to upload
              </p>
              <p className="text-xs text-[var(--muted)]">
                PNG/JPG/WebP, up to 8MB
              </p>
            </div>
            {imageFile ? (
              <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-black/10 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-[var(--muted)]">
                    {imageFile.name} вЂў {formatFileSize(imageFile.size)}
                  </span>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={clearFileInput}
                    disabled={state !== "idle"}
                  >
                    Remove
                  </Button>
                </div>
                {previewUrl ? (
                  <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-black/20">
                    <img
                      src={previewUrl}
                      alt="Selected preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <label className="md:col-span-2 flex flex-col gap-2 text-sm">
            Message / Notes (optional)
            <textarea
              name="notes"
              rows={4}
              value={values.notes}
              onChange={handleChange}
              disabled={state !== "idle"}
              className="rounded-2xl border border-[var(--border)] bg-black/20 px-4 py-3 text-sm outline-none focus:border-[var(--gold)]"
              placeholder="Style, preferences, deadline, reference links."
            />
          </label>

          <div className="md:col-span-2 mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button type="submit" disabled={state !== "idle"}>
              {state === "submitting" ? "Sending..." : "Send request"}
            </Button>
            {error ? (
              <div className="flex flex-wrap items-center gap-3 text-sm text-red-400">
                <span>{error}</span>
                <Button type="button" variant="secondary" onClick={handleTryAgain}>
                  Try again
                </Button>
              </div>
            ) : null}
          </div>
        </form>
      </section>

      <section className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10">
        <h2 className="text-xl font-semibold">Payment methods</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Payment is discussed after we confirm the details.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {paymentMethods.map((item) => (
            <div
              key={item.label}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-[var(--border)] bg-black/10 p-5 text-center transition hover:-translate-y-0.5 hover:border-white/20"
            >
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-black/20 sm:h-20 sm:w-20 md:h-24 md:w-24">
                {/* animated webp */}
                <Image
                  src={item.src}
                  alt={item.label}
                  width={96}
                  height={96}
                  unoptimized
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-xs text-[var(--muted)] sm:text-sm">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
