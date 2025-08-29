// src/components/ScrollToTop.tsx
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/** Instantly reset scroll to top on route change (before paint). */
export default function ScrollToTop({ containerId }: { containerId?: string }) {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    // Let in-page anchors (#hash) handle their own scroll target.
    if (hash) return;

    const el = containerId ? document.getElementById(containerId) : null;
    if (el) el.scrollTo(0, 0);
    else window.scrollTo(0, 0);
  }, [pathname, search, hash, containerId]);

  return null;
}
