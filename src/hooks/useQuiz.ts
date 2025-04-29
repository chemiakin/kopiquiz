import { useState } from 'react';
import { useFirebase } from './useFirebase';
import { QuizData, QuizOption, Results, Scores } from '../types/quiz';

const quizData: QuizData[] = [
  {
    question: 'Майские праздники зовут! Как вы проведете эти теплые деньки?',
    options: [
      { text: 'Соберете друзей и зажжете мангал — шашлыки ждут!', points: { grill: 2 } },
      { text: 'Отправитесь на пробежку или в зал — энергия бьет ключом!', points: { sport: 2 } },
      {
        text: 'Останетесь дома, укроетесь пледом и будете наслаждаться уютом с семьей.',
        points: { home: 2 },
      },
      { text: 'Прогуляйтесь по магазинам, выберете что-то вкусное для праздников.', points: { shop: 2 } },
    ],
  },
  {
    question: 'Что захватите для душевного перекуса на природе?',
    options: [
      { text: 'Ароматный шашлычок, только с гриля — ммм, вкуснятина!', points: { grill: 2 } },
      { text: 'Протеиновый коктейль или батончик — для бодрости!', points: { sport: 2 } },
      { text: 'Бутерброды, заботливо приготовленные дома с любовью.', points: { home: 2 } },
      { text: 'Свежие фрукты и овощи из лавки — ярко и полезно!', points: { shop: 2 } },
    ],
  },
  {
    question: 'Какой напиток согреет ваш майский день?',
    options: [
      { text: 'Освежающий квас — идеально к шашлыку!', points: { grill: 2 } },
      { text: 'Бодрящий смузи или вода с лимоном — для тонуса!', points: { sport: 2 } },
      { text: 'Теплый чай из любимой кружки, как дома.', points: { home: 2 } },
      { text: 'Натуральный сок или лимонад из магазина.', points: { shop: 2 } },
    ],
  },
  {
    question: 'Какой вечер после яркого дня вам по душе?',
    options: [
      { text: 'Посиделки у костра с песнями под гитару — душевно!', points: { grill: 2 } },
      { text: 'Легкая йога или прогулка под звездами — для гармонии.', points: { sport: 2 } },
      { text: 'Фильм под пледом с родными — уютнее не бывает!', points: { home: 2 } },
      { text: 'Разбор покупок и планы на завтра — порядок во всем!', points: { shop: 2 } },
    ],
  },
  {
    question: 'Каким вы видите свой идеальный майский выходной?',
    options: [
      { text: 'Смех друзей, аромат шашлыка и природа вокруг — замечательно!', points: { grill: 2 } },
      { text: 'Активный день, тренировки и заряд энергии!', points: { sport: 2 } },
      { text: 'Тишина, родные рядом и тепло домашнего очага.', points: { home: 2 } },
      { text: 'Удачный шопинг и все готово к праздникам!', points: { shop: 2 } },
    ],
  },
];

const results: Results = {
  grill: {
    title: 'Вы — Король шашлыков!',
    description:
      'Вы — душа компании, и ваш мангал — центр притяжения! Майские для вас — это смех друзей, ароматный шашлык и радость на природе.',
  },
  sport: {
    title: 'Вы — Спортивный герой!',
    description:
      'Ваша энергия зажигает всех вокруг! Майские праздники для вас — время для активности, свежего воздуха и новых спортивных побед.',
  },
  home: {
    title: 'Вы — Ёжик-домосед!',
    description:
      'Ваш дом — ваша крепость, полная уюта и тепла. Майские для вас — это время для близких, фильмов и мягкого пледа.',
  },
  shop: {
    title: 'Вы — Мастер покупок!',
    description:
      'Вы умеете находить лучшее и делать праздники вкусными! Шопинг для вас — это искусство, а майские — время для удачных находок.',
  },
};

export function useQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(-1);
  const [scores, setScores] = useState<Scores>({ grill: 0, sport: 0, home: 0, shop: 0 });
  const [showGift, setShowGift] = useState<boolean>(false);
  const { db } = useFirebase();

  const startQuiz = () => {
    setCurrentQuestion(0);
  };

  const selectOption = (option: QuizOption) => {
    const newScores: Scores = { ...scores };
    for (const key in option.points) {
      const scoreKey = key as keyof Scores;
      const points = option.points[scoreKey];
      if (typeof points === 'number') {
        newScores[scoreKey] += points;
      }
    }
    setScores(newScores);
    const nextButton = document.getElementById('next') as HTMLButtonElement;
    if (nextButton) {
      nextButton.disabled = false;
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      const nextButton = document.getElementById('next') as HTMLButtonElement;
      if (nextButton) {
        nextButton.disabled = true;
      }
    } else {
      setCurrentQuestion(quizData.length);
    }
  };

  const sendResultToFirestore = async () => {
    if (!db) {
      console.error('Firebase не инициализирован');
      return;
    }

    let maxScore = 0;
    let resultType: keyof Results = 'home';
    for (const key in scores) {
      if (scores[key as keyof Scores] > maxScore) {
        maxScore = scores[key as keyof Scores];
        resultType = key as keyof Results;
      }
    }
    const userId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const data = {
      userId,
      result: resultType,
      timestamp: new Date().toISOString(),
      scores: { ...scores },
    };

    try {
      console.log('Отправка данных в Firestore:', data);
      const docRef = await db.collection('results').add(data);
      console.log('Результат сохранен в Firestore с ID:', docRef.id);
      return true;
    } catch (error) {
      console.error('Ошибка при сохранении результата:', error);
      if (error instanceof Error) {
        console.error('Детали ошибки:', error.message);
      }
      return false;
    }
  };

  return {
    currentQuestion,
    scores,
    quizData,
    results,
    startQuiz,
    selectOption,
    nextQuestion,
    showResult: () => setCurrentQuestion(quizData.length),
    setShowGift,
    showGift,
    sendResultToFirestore,
  };
}