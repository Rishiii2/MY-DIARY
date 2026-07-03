import PostCard from "@/components/PostCard";
import { posts } from "@/lib/posts";

export const metadata = {
  title: "All entries — The Diary",
};

export default function BlogIndex() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-amber">
        the full log
      </p>
      <h1 className="mb-10 font-display text-4xl text-paper">All entries</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
