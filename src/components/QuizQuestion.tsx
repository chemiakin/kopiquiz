"use client"
import { useState, useEffect } from 'react';
import { QuizData, QuizOption } from '../types/quiz';

interface QuizQuestionProps {
  question: QuizData;
  selectOption: (option: QuizOption) => void;
  nextQuestion: () => void;
}

export default function QuizQuestion({ question, selectOption, nextQuestion }: QuizQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Сбрасываем состояние при изменении вопроса
  useEffect(() => {
    setSelectedOption(null);
  }, [question]);

  const handleOptionClick = (option: QuizOption, index: number): void => {
    setSelectedOption(index);
    selectOption(option);
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#FFF8E7] mb-6">{question.question}</h2>
      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(option, index)}
            className={`p-4 border-2 rounded-lg cursor-pointer text-lg transition-all text-[#4A2C2A] ${
              selectedOption === index
                ? 'bg-[#FFE8D6] border-[#FFD1B9] scale-[1.02]'
                : 'bg-[#FFD1B9] border-[#FFF8E7] hover:bg-[#FFE8D6] hover:scale-[1.02]'
            }`}
          >
            {option.text}
          </div>
        ))}
      </div>
      <button
        onClick={nextQuestion}
        disabled={selectedOption === null}
        id="next"
        className="mt-6 px-6 py-3 bg-[#FFD1B9] text-[#4A2C2A] border-2 border-[#FFF8E7] rounded-lg text-lg float-right disabled:bg-[#D88C9A] disabled:cursor-not-allowed hover:bg-[#FFE8D6] hover:border-[#FFD1B9] transition-all"
      >
        Далее
      </button>
    </div>
  );
}