"use client"
import Image from 'next/image';
import QuizIntro from '../components/QuizIntro';
import QuizQuestion from '../components/QuizQuestion';
import QuizResult from '../components/QuizResult';
import QuizGift from '../components/QuizGift';
import { useQuiz } from '../hooks/useQuiz';

export default function Home() {
  const {
    currentQuestion,
    scores,
    quizData,
    results,
    startQuiz,
    selectOption,
    nextQuestion,
    showGift,
    setShowGift,
    sendResultToFirestore,
  } = useQuiz();

  if (!quizData) {
    return (
      <div className="min-h-screen bg-[#E40046] flex flex-col items-center justify-center p-4">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  const handleShowGift = () => {
    sendResultToFirestore();
    setShowGift(true);
  };

  return (
    <div className="min-h-screen bg-[#E40046] flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center mb-5">
        <Image 
          src="/compname.png" 
          alt="Калица малица" 
          width={300} 
          height={100} 
          className="mb-2"
          onError={(e) => {
            console.error('Ошибка загрузки изображения:', e);
          }}
        />
        <Image 
          src="/quizname.png" 
          alt="Майский копил-квиз" 
          width={250} 
          height={80}
          onError={(e) => {
            console.error('Ошибка загрузки изображения:', e);
          }}
        />
      </div>
      <div className="w-full max-w-2xl text-center">
        {currentQuestion === -1 && <QuizIntro startQuiz={startQuiz} />}
        {currentQuestion >= 0 && currentQuestion < quizData.length && (
          <QuizQuestion
            question={quizData[currentQuestion]}
            selectOption={selectOption}
            nextQuestion={nextQuestion}
          />
        )}
        {currentQuestion === quizData.length && !showGift && (
          <QuizResult
            scores={scores}
            results={results}
            showGift={handleShowGift}
          />
        )}
        {showGift && <QuizGift />}
      </div>
    </div>
  );
}