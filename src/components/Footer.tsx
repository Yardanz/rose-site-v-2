export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/15 bg-[var(--surface)]/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 text-[13px] text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <div className="text-[var(--muted)]/90">
          Motion design for Steam & Discord profiles
        </div>
        <div className="flex flex-col gap-1 md:items-center md:gap-2">
          <a
            href="https://example.com"
            className="transition duration-200 hover:text-[var(--text)] hover:underline hover:decoration-white/30 hover:underline-offset-4"
          >
            Discord: yourname
          </a>
          <a
            href="https://example.com"
            className="transition duration-200 hover:text-[var(--text)] hover:underline hover:decoration-white/30 hover:underline-offset-4"
          >
            Steam: yourname
          </a>
          {/* TODO: replace with your real Discord/Steam handles */}
        </div>
        <div className="text-[var(--muted)]/60 tracking-wide">
          (c) {new Date().getFullYear()} R.A. Design
        </div>
      </div>
    </footer>
  );
}
