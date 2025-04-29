"use client"
import { Results, Scores } from '../types/quiz';

interface QuizResultProps {
  scores: Scores;
  results: Results;
  showGift: () => void;
}

export default function QuizResult({ scores, results, showGift }: QuizResultProps) {
  let maxScore = 0;
  let resultType: keyof Results = 'home';
  for (const key in scores) {
    if (scores[key as keyof Scores] > maxScore) {
      maxScore = scores[key as keyof Scores];
      resultType = key as keyof Results;
    }
  }
  const result = results[resultType];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#FFF8E7] mb-4">{result.title}</h2>
      <p className="text-lg text-[#FFF8E7] mb-6">{result.description}</p>
      <button
        onClick={showGift}
        className="px-8 py-3 bg-[#FFD1B9] text-[#4A2C2A] border-2 border-[#FFF8E7] rounded-lg text-lg font-semibold hover:bg-[#FFE8D6] hover:border-[#FFD1B9] transition-transform animate-pulse"
      >
        Забрать подарок
      </button>
    </div>
  );
}