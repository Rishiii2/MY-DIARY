import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="focus-ring group flex items-baseline gap-2">
          <span className="font-display text-xl italic tracking-tight text-paper">
            The Diary
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted group-hover:text-amber sm:inline">
            log Δt
          </span>
        </Link>

        <nav className="flex items-center gap-6 font-mono text-sm">
          <Link href="/blog" className="focus-ring text-muted transition-colors hover:text-paper">
            entries
          </Link>
          <Link href="/#categories" className="focus-ring text-muted transition-colors hover:text-paper">
            topics
          </Link>
          <Link href="/#about" className="focus-ring text-muted transition-colors hover:text-paper">
            about
          </Link>
        </nav>
      </div>
    </header>
  );
}
