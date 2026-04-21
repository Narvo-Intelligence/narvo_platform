/**
 * Quiet canvas — flat void + very subtle grid (Supabase-like).
 * No animated stream, glow orbs, or film noise.
 */
export function BgLayer() {
  return (
    <div className="bg-layer" aria-hidden="true">
      <div className="bg-grid" />
    </div>
  );
}
