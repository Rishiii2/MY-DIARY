import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber">error 404</p>
      <h1 className="mt-4 font-display text-3xl italic text-paper">
        This entry doesn't exist in the log.
      </h1>
      <Link
        href="/blog"
        className="focus-ring mt-8 rounded-full border border-line px-6 py-3 font-mono text-sm text-muted hover:text-paper"
      >
        ← back to all entries
      </Link>
    </section>
  );
}
