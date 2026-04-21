/**
 * Counter-up on viewport entry — browser-only (import from client components).
 * Ported from narvo-plat/resources/js/lib/counter.js
 */

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animate(el: HTMLElement) {
  const to = parseFloat(el.dataset.countTo ?? "0");
  const suffix = el.dataset.suffix || "";
  const isFloat = to % 1 !== 0;

  if (reduceMotion) {
    el.textContent = (isFloat ? to.toFixed(2) : String(Math.round(to))) + suffix;
    return;
  }

  const duration = 1400;
  const start = performance.now();
  function step(now: number) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - (1 - t) ** 3;
    const v = to * eased;
    el.textContent = (isFloat ? v.toFixed(2) : String(Math.round(v))) + suffix;
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export function observeCounters(root: ParentNode = document) {
  const els = root.querySelectorAll<HTMLElement>(".stat-num[data-count-to]");
  if (typeof IntersectionObserver === "undefined") {
    els.forEach(animate);
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          animate(e.target as HTMLElement);
          observer.unobserve(e.target);
        }
      }
    },
    { threshold: 0.4 },
  );
  els.forEach((el) => observer.observe(el));
}
