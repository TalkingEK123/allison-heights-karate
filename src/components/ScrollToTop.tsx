// src/components/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scroll window (or a container) to top whenever the route changes. */
export default function ScrollToTop({ containerId, behavior = "instant" }: {
  containerId?: string;            // if you scroll inside a div, pass its id
  behavior?: ScrollBehavior;       // "smooth" | "instant"
}) {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, let the in-page jump handle it.
    if (hash) return;

    const el = containerId ? document.getElementById(containerId) : null;
    if (el) el.scrollTo({ top: 0, left: 0, behavior });
    else window.scrollTo({ top: 0, left: 0, behavior });
  }, [pathname, search, hash, containerId, behavior]);

  return null;
}
