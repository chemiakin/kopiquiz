import { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Проверяем конфигурацию
if (!firebaseConfig.projectId) {
  console.error('Ошибка: projectId не определен в конфигурации Firebase');
  throw new Error('Firebase projectId не определен');
}

let firebaseInstance: firebase.firestore.Firestore | undefined;

export function useFirebase() {
  useEffect(() => {
    try {
      if (!firebase.apps.length) {
        console.log('Инициализация Firebase...');
        const app = firebase.initializeApp(firebaseConfig);
        console.log('Firebase инициализирован:', app.name);
      }
      
      if (!firebaseInstance) {
        console.log('Инициализация Firestore...');
        firebaseInstance = firebase.firestore();
        // Включаем офлайн-персистентность
        firebaseInstance.enablePersistence()
          .catch((err) => {
            console.error('Ошибка при включении офлайн-персистентности:', err);
          });
        console.log('Firestore инициализирован');
      }
    } catch (error) {
      console.error('Ошибка при инициализации Firebase:', error);
    }
  }, []);

  return { db: firebaseInstance };
}