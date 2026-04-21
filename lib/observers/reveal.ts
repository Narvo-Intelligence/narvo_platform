/**
 * Reveal-on-scroll — ported from narvo-plat/resources/js/lib/reveal.js
 */

let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            sharedObserver?.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1 },
    );
  }
  return sharedObserver;
}

export function observeReveal(el: Element | null) {
  const observer = getSharedObserver();
  if (!el || !observer) return;
  el.classList.add("reveal");
  observer.observe(el);
}

export function observeRevealAll(selectorOrList: string | Iterable<Element>, root: ParentNode = document) {
  const list =
    typeof selectorOrList === "string"
      ? root.querySelectorAll(selectorOrList)
      : selectorOrList;
  for (const el of list) observeReveal(el);
}
