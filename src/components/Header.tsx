"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/Buttons";

export default function Header() {
  const pathname = usePathname();
  const navItems = [
    { href: "/gallery", label: "Gallery" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/reputation", label: "Reputation" },
  ];
  const mobileItems = [...navItems, { href: "/order", label: "Order" }];

  return (
    <header className="border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-lg font-semibold tracking-wide text-[var(--text)] transition duration-200 ease-out hover:text-white/90"
        >
          <span className="h-2 w-2 rounded-full bg-white/20 shadow-none transition duration-200 ease-out group-hover:bg-[var(--gold)] group-hover:shadow-[0_0_10px_rgba(216,179,86,0.45)]" />
          <span className="relative">
            <span className="text-[var(--text)]">R.A.</span>{" "}
            <span className="text-[var(--text)]/70">Design</span>
            <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-white/30 transition-all duration-200 ease-out group-hover:w-full" />
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "relative text-[var(--muted)]/80 transition",
                    "hover:text-[var(--text)] hover:opacity-100",
                    isActive
                      ? "text-[var(--text)] after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:bg-white/30"
                      : "",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <span
            className="hidden h-5 w-px bg-white/10 md:block"
            aria-hidden
          />

          <Button
            asChild
            className="py-3.5 shadow-[0_0_20px_rgba(216,179,86,0.2)] transition-shadow hover:shadow-[0_0_28px_rgba(216,179,86,0.35)]"
          >
            <Link href="/order">Order</Link>
          </Button>
        </div>
      </div>

      <nav className="md:hidden">
        <div className="mx-auto w-full max-w-6xl px-4 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto rounded-2xl border border-[var(--border)] bg-black/20 p-2 text-sm">
            {mobileItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "whitespace-nowrap rounded-xl px-3 py-2 transition",
                    isActive
                      ? "bg-white/10 text-[var(--text)] shadow-[0_0_16px_rgba(216,179,86,0.25)]"
                      : "text-[var(--muted)]/80 hover:text-[var(--text)]",
                    item.href === "/order"
                      ? "border border-[var(--gold)]/40 text-[var(--text)]"
                      : "border border-transparent",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
