import Link from "next/link";
import OrbitScope from "@/components/OrbitScope";
import PostCard from "@/components/PostCard";
import { posts, getAllCategories, categoryColor } from "@/lib/posts";

export default function Home() {
  const categories = getAllCategories();
  const latest = posts.slice(0, 3);

  return (
    <>
      {/* Hero — the three-body phase-space trace is the thesis: a system in
          motion, same as everything this diary is about. */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-amber">
              field notes · vol. 1
            </p>
            <h1 className="text-balance font-display text-5xl leading-[1.05] text-paper sm:text-6xl">
              A running log of{" "}
              <span className="italic text-amber">physics</span>,{" "}
              <span className="italic text-cyan">machine learning</span>, and{" "}
              <span className="italic text-violet">the sky</span>.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
              Written by Rishi — Engineering Physics at DTU, currently deep in
              a 5G intelligent-surface simulator by day and orbital mechanics
              by night. This is where the half-finished derivations go before
              they become something clean.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/blog"
                className="focus-ring rounded-full bg-amber px-6 py-3 font-mono text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
              >
                Read the entries →
              </Link>
              <Link
                href="/#about"
                className="focus-ring rounded-full border border-line px-6 py-3 font-mono text-sm text-muted transition-colors hover:text-paper"
              >
                Who's writing this?
              </Link>
            </div>
          </div>

          <div className="h-[340px] sm:h-[420px]">
            <OrbitScope />
            <p className="mt-3 text-center font-mono text-[11px] text-muted/70">
              a bounded three-body problem, integrated live in your browser
            </p>
          </div>
        </div>
      </section>

      {/* Categories — four lenses, not a numbered sequence, since order
          carries no meaning here. */}
      <section id="categories" className="border-y border-line/70 bg-surface/40 py-14">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Four lenses
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categories.map((c) => (
              <div
                key={c}
                className={`rounded-xl border p-5 font-display text-lg italic ${categoryColor[c]}`}
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest entries */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl text-paper">Latest entries</h2>
          <Link href="/blog" className="focus-ring font-mono text-sm text-muted hover:text-amber">
            view all →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-line/70 bg-surface/40 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan">about</p>
          <h2 className="font-display text-2xl italic text-paper sm:text-3xl">
            I write things down so the ideas hold still long enough to check.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            First-year Engineering Physics at DTU. Currently building an
            intelligent-surface simulator for the DoT 5G Lab, along with a
            handful of ML and robotics side projects. This diary is the
            unfiltered version of that work — derivations, dead ends, and the
            occasional working demo.
          </p>
        </div>
      </section>
    </>
  );
}
