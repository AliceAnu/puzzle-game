import SHA256 from "crypto-js/sha256";

/* -----------------------------
   Seeded Random Generator
----------------------------- */

export function getSeededRandom(date: string) {
  const secret = "daily_puzzle_secret_key";

  // SHA256 hash
  const hash = SHA256(date + secret).toString();

  // Convert hash → number
  let seed = parseInt(hash.substring(0, 8), 16);

  // Deterministic random function
  return function rand() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}
