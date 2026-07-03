export default function Footer() {
  return (
    <footer className="border-t border-line/70 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 font-mono text-xs text-muted sm:flex-row sm:items-center">
        <p>&copy; {new Date().getFullYear()} Rishi — written between lab sessions.</p>
        <p className="text-muted/70">DTU · Engineering Physics · 5G Lab</p>
      </div>
    </footer>
  );
}
