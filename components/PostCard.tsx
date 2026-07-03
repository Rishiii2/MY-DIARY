import Link from "next/link";
import { Post, categoryColor } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="focus-ring group block rounded-xl border border-line bg-surface p-6 transition-colors hover:border-amber/50 hover:bg-surface2"
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider ${categoryColor[post.category]}`}
        >
          {post.category}
        </span>
        <span className="font-mono text-[11px] text-muted">{post.readTime}</span>
      </div>
      <h3 className="font-display text-xl leading-snug text-paper group-hover:text-amber transition-colors">
        {post.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
      <p className="mt-4 font-mono text-[11px] text-muted/70">{post.date}</p>
    </Link>
  );
}
