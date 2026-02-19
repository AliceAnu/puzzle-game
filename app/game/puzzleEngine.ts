export type Puzzle = {
  id: string;
  type: string;
  question: string;
  answer: string;
};

/* -----------------------------
   ✅ Puzzle Generators (5 Types)
----------------------------- */

// 1️⃣ Math Puzzle
export function generateMathPuzzle(rand: () => number): Puzzle {
  const a = Math.floor(rand() * 50);
  const b = Math.floor(rand() * 50);

  return {
    id: "",
    type: "math",
    question: `What is ${a} + ${b}?`,
    answer: String(a + b),
  };
}

// 2️⃣ Scrambled Word Puzzle
export function generateScramblePuzzle(rand: () => number): Puzzle {
  const words = ["apple", "banana", "orange", "grape", "mango"];

  const word = words[Math.floor(rand() * words.length)];

  const scrambled = word
    .split("")
    .sort(() => rand() - 0.5)
    .join("");

  return {
    id: "",
    type: "scramble",
    question: `Unscramble this word: ${scrambled.toUpperCase()}`,
    answer: word,
  };
}

// 3️⃣ Riddle Puzzle
export function generateRiddlePuzzle(rand: () => number): Puzzle {
  const riddles = [
    { q: "I have keys but no locks. What am I?", a: "piano" },
    { q: "What has hands but cannot clap?", a: "clock" },
    { q: "What has a head and a tail but no body?", a: "coin" },
  ];

  const r = riddles[Math.floor(rand() * riddles.length)];

  return {
    id: "",
    type: "riddle",
    question: r.q,
    answer: r.a,
  };
}

// 4️⃣ Sequence Puzzle
export function generateSequencePuzzle(rand: () => number): Puzzle {
  const sequences = [
    { q: "2, 4, 8, 16, ?", a: "32" },
    { q: "5, 10, 20, 40, ?", a: "80" },
    { q: "3, 6, 9, 12, ?", a: "15" },
  ];

  const s = sequences[Math.floor(rand() * sequences.length)];

  return {
    id: "",
    type: "sequence",
    question: `Complete the sequence: ${s.q}`,
    answer: s.a,
  };
}

// 5️⃣ Trivia Puzzle
export function generateTriviaPuzzle(rand: () => number): Puzzle {
  const trivia = [
    { q: "Capital of India?", a: "delhi" },
    { q: "Largest planet in our solar system?", a: "jupiter" },
    { q: "Founder of Microsoft?", a: "bill gates" },
  ];

  const t = trivia[Math.floor(rand() * trivia.length)];

  return {
    id: "",
    type: "trivia",
    question: `Trivia: ${t.q}`,
    answer: t.a,
  };
}

/* -----------------------------
   ✅ Validator
----------------------------- */

export function validateAnswer(puzzle: Puzzle, input: string): boolean {
  return (
    puzzle.answer.trim().toLowerCase() === input.trim().toLowerCase()
  );
}
