/**
 * Seeded pseudo-random generator (deterministic)
 */
export function seededRandom(seed: number): () => number {
  let value = seed;

  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}
