"use client"
interface QuizIntroProps {
  startQuiz: () => void;
}

export default function QuizIntro({ startQuiz }: QuizIntroProps) {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#FFF8E7] mb-6">
        Добро пожаловать в наш майский квиз!
      </h1>
      <p className="text-lg text-[#FFF8E7] mb-8">
        Майские праздники — время тепла, уюта и вкусных шашлыков! Пройдите наш короткий квиз, чтобы
        узнать, кто вы в эти солнечные дни: мастер гриля, спортивный герой, уютный домосед или гений
        шопинга. В конце вас ждет промокод на тройной кешбэк за покупку шашлыка в нашем магазине
        фермерских продуктов!
      </p>
      <button
        onClick={startQuiz}
        className="px-8 py-3 bg-[#FFD1B9] text-[#4A2C2A] border-2 border-[#FFF8E7] rounded-lg text-lg font-semibold hover:bg-[#FFE8D6] hover:border-[#FFD1B9] transition-transform animate-pulse"
      >
        Начать квиз
      </button>
    </div>
  );
}