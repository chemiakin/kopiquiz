"use client"
import Image from 'next/image';
import { useState } from 'react';

export default function QuizGift() {
  const [buttonText, setButtonText] = useState<string>('Копировать');
  const [isError, setIsError] = useState<boolean>(false);

  const copyPromo = async () => {
    const promoCode = 'SHASHLYK2025';
    try {
      await navigator.clipboard.writeText(promoCode);
      setButtonText('Скопировано!');
      setTimeout(() => setButtonText('Копировать'), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = promoCode;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setButtonText('Скопировано!');
        setTimeout(() => setButtonText('Копировать'), 2000);
      } catch {
        setButtonText('Ошибка');
        setIsError(true);
        setTimeout(() => {
          setButtonText('Копировать');
          setIsError(false);
        }, 2000);
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <div role="dialog" aria-labelledby="gift-title">
      <h2 id="gift-title" className="text-2xl md:text-3xl font-bold text-[#FFF8E7] mb-4">
        Тройной кешбэк!
      </h2>
      <p className="text-lg text-[#FFF8E7] mb-6">
        Покажите QR-код на кассе, чтобы получить тройной кешбэк на любую покупку в магазине
      </p>
      <div className="relative">
        <Image 
          src="/qr.png" 
          alt="QR-код для получения тройного кешбэка" 
          width={200} 
          height={200} 
          className="mx-auto mb-6"
          onError={(e) => {
            console.error('Ошибка загрузки QR-кода:', e);
            setIsError(true);
          }}
        />
        {isError && (
          <p className="text-[#FFD1B9] text-sm mt-2">
            Не удалось загрузить QR-код. Пожалуйста, используйте промокод ниже.
          </p>
        )}
      </div>
      <p className="text-lg text-[#FFF8E7] mb-4">
        или при заказе любимых продуктов через приложение по промокоду. Действует все майские.
      </p>
      <div className="flex flex-col items-center gap-4">
        <span 
          className="px-4 py-2 bg-[#FFD1B9] text-[#4A2C2A] rounded-md font-bold text-lg"
          aria-label="Промокод SHASHLYK2025"
        >
          SHASHLYK2025
        </span>
        <button
          onClick={copyPromo}
          className={`px-4 py-2 bg-[#FFD1B9] text-[#4A2C2A] border-2 border-[#FFF8E7] rounded-md text-base hover:bg-[#FFE8D6] hover:border-[#FFD1B9] transition-all ${
            buttonText === 'Скопировано!' ? 'animate-pulse' : ''
          }`}
          aria-label="Копировать промокод"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}