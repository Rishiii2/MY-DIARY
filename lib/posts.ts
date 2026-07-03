export type Category = "Physics" | "AI/ML" | "Mathematics" | "Astronomy";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  readTime: string;
  date: string;
  content: string;
};

export const categoryColor: Record<Category, string> = {
  Physics: "text-amber border-amber/40 bg-amber/10",
  "AI/ML": "text-cyan border-cyan/40 bg-cyan/10",
  Mathematics: "text-violet border-violet/40 bg-violet/10",
  Astronomy: "text-paper border-paper/30 bg-paper/10",
};

export const posts: Post[] = [
  {
    slug: "reconfigurable-intelligent-surfaces-explained",
    title: "What an Intelligent Reflecting Surface Actually Does to a Wavefront",
    excerpt:
      "Notes from building IRS-Sim: how a cascaded channel model turns a wall of passive elements into a programmable mirror for 5G signals.",
    category: "Physics",
    readTime: "8 min",
    date: "2026-06-14",
    content:
      "Full post coming soon — this is a placeholder generated for the initial build of The Diary.",
  },
  {
    slug: "dqn-for-phase-optimization",
    title: "Teaching a DQN to Point a Signal Around a Corner",
    excerpt:
      "Why phase-shift optimization on a RIS panel is a reinforcement learning problem in disguise, and where the reward shaping gets tricky.",
    category: "AI/ML",
    readTime: "10 min",
    date: "2026-06-02",
    content:
      "Full post coming soon — this is a placeholder generated for the initial build of The Diary.",
  },
  {
    slug: "lissajous-and-phase-portraits",
    title: "Lissajous Curves Are Just Two Clocks Arguing",
    excerpt:
      "A visual walk through phase portraits, resonance ratios, and why the prettiest curves come from the ugliest fractions.",
    category: "Mathematics",
    readTime: "6 min",
    date: "2026-05-21",
    content:
      "Full post coming soon — this is a placeholder generated for the initial build of The Diary.",
  },
  {
    slug: "chandrayaan-site-selection-terramechanics",
    title: "Choosing a Landing Site with Bekker Terramechanics",
    excerpt:
      "How regolith mechanics, slope maps, and a Pareto frontier decide where a rover is allowed to be brave.",
    category: "Astronomy",
    readTime: "12 min",
    date: "2026-04-30",
    content:
      "Full post coming soon — this is a placeholder generated for the initial build of The Diary.",
  },
  {
    slug: "kalman-filters-from-first-principles",
    title: "Kalman Filters, or: How to Trust a Noisy Sensor Correctly",
    excerpt:
      "Deriving the update equations from a Bayesian prior instead of memorizing the matrix soup.",
    category: "Mathematics",
    readTime: "9 min",
    date: "2026-04-10",
    content:
      "Full post coming soon — this is a placeholder generated for the initial build of The Diary.",
  },
  {
    slug: "why-neural-tangent-kernels-matter",
    title: "The Neural Tangent Kernel Is a Cheat Code, Not a Coincidence",
    excerpt:
      "What happens to a very wide network's training dynamics, and why it starts looking suspiciously linear.",
    category: "AI/ML",
    readTime: "11 min",
    date: "2026-03-22",
    content:
      "Full post coming soon — this is a placeholder generated for the initial build of The Diary.",
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getAllCategories(): Category[] {
  return ["Physics", "AI/ML", "Mathematics", "Astronomy"];
}
