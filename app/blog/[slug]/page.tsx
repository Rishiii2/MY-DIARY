import { notFound } from "next/navigation";
import Link from "next/link";
import { posts, getPostBySlug, categoryColor } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/blog" className="focus-ring font-mono text-xs text-muted hover:text-amber">
        ← back to all entries
      </Link>

      <div className="mt-6 mb-4 flex items-center gap-3">
        <span
          className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider ${categoryColor[post.category]}`}
        >
          {post.category}
        </span>
        <span className="font-mono text-[11px] text-muted">
          {post.date} · {post.readTime}
        </span>
      </div>

      <h1 className="font-display text-4xl leading-tight text-paper">{post.title}</h1>
      <p className="mt-4 text-base text-muted">{post.excerpt}</p>

      <div className="prose prose-invert mt-10 max-w-none font-body leading-relaxed text-paper/90">
        <p>{post.content}</p>
      </div>
    </article>
  );
}
