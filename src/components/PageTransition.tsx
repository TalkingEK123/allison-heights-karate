import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PageTransition({
  targetId = "main",
  durationMs = 200,
}: {
  targetId?: string;
  durationMs?: number;
}) {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // don't fade when jumping to an anchor on the same page

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduce) return;

    const el = (targetId ? document.getElementById(targetId) : document.body) as HTMLElement | null;
    if (!el) return;

    // Start hidden, then fade to 1
    el.style.opacity = "0";
    el.style.willChange = "opacity";
    el.style.transition = `opacity ${durationMs}ms ease-out`;

    // Next frame -> fade in
    requestAnimationFrame(() => {
      el.style.opacity = "1";
    });

    // Clean up transition so dev tools don’t show stale inline styles
    const t = setTimeout(() => {
      el.style.transition = "";
      el.style.willChange = "";
    }, durationMs + 50);

    return () => clearTimeout(t);
  }, [pathname, search, hash, targetId, durationMs]);

  return null;
}
