"use client"
import { useState, useEffect, useCallback } from 'react';
import { useFirebase } from '../../hooks/useFirebase';
import { StatsData } from '../../types/quiz';

export default function Stats() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { db } = useFirebase();

  useEffect(() => {
    const enteredPassword = prompt('Введите пароль для доступа к статистике:');
    if (enteredPassword === 'yourpassword') {
      setIsAuthenticated(true);
    } else {
      alert('Неверный пароль!');
      window.location.href = '/';
    }
  }, []);

  const fetchStats = useCallback(async () => {
    if (!db) {
      console.error('Firebase не инициализирован');
      setError('Ошибка инициализации базы данных');
      return;
    }

    try {
      const snapshot = await db.collection('results').get();
      const results = snapshot.docs.map((doc) => doc.data() as { result: string });
      const statsData: StatsData = {
        total: results.length,
        grill: results.filter((r) => r.result === 'grill').length,
        sport: results.filter((r) => r.result === 'sport').length,
        home: results.filter((r) => r.result === 'home').length,
        shop: results.filter((r) => r.result === 'shop').length,
      };
      setStats(statsData);
    } catch (err) {
      console.error('Ошибка при загрузке статистики:', err);
      setError('Ошибка загрузки статистики');
    }
  }, [db]);

  useEffect(() => {
    if (isAuthenticated && db) {
      fetchStats();
    }
  }, [isAuthenticated, db, fetchStats]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#E40046] flex flex-col items-center justify-center p-4 text-[#FFF8E7]">
      <h1 className="text-3xl font-bold mb-5">Статистика квиза</h1>
      <div className="text-lg">
        {error && <p>{error}</p>}
        {stats && (
          <>
            <p>Всего участников: {stats.total}</p>
            <p>Король шашлыков: {stats.grill}</p>
            <p>Спортивный герой: {stats.sport}</p>
            <p>Ёжик-домосед: {stats.home}</p>
            <p>Мастер покупок: {stats.shop}</p>
          </>
        )}
      </div>
    </div>
  );
}