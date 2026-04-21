"use client";

import { observeRevealAll } from "@/lib/observers/reveal";
import { type ReactNode, useEffect, useRef } from "react";

export function PlaygroundReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) observeRevealAll(".playground__step", ref.current);
  }, []);

  return (
    <div ref={ref} className="playground__guide">
      {children}
    </div>
  );
}
