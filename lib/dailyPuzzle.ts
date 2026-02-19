import {
  Puzzle,
  generateMathPuzzle,
  generateScramblePuzzle,
  generateRiddlePuzzle,
  generateSequencePuzzle,
  generateTriviaPuzzle,
} from "@/game/puzzleEngine";

export function getRandomPuzzle(): Puzzle {
  const rand = Math.random;

  const puzzles = [
    generateMathPuzzle(rand),
    generateScramblePuzzle(rand),
    generateRiddlePuzzle(rand),
    generateSequencePuzzle(rand),
    generateTriviaPuzzle(rand),
  ];

  const selected = puzzles[Math.floor(rand() * puzzles.length)];

  return {
    ...selected,
    id: crypto.randomUUID(),
  };
}
