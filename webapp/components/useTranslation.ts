"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

export const useTranslation = (key: string) => {
  const { t, tBatch } = useLanguage();
  const [translation, setTranslation] = useState(key);

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        const result = await t(key);
        setTranslation(result);
      } catch (error) {
        console.error('Translation error:', error);
        setTranslation(key);
      }
    };

    fetchTranslation();
  }, [key, t]);

  return translation;
};

// Hook for batch translations
export const useBatchTranslation = (keys: string[]) => {
  const { tBatch } = useLanguage();
  const [translations, setTranslations] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTranslations = async () => {
      if (keys.length === 0) return;
      
      setLoading(true);
      try {
        const results = await tBatch(keys);
        const translationMap: { [key: string]: string } = {};
        keys.forEach((key, index) => {
          translationMap[key] = results[index];
        });
        setTranslations(translationMap);
      } catch (error) {
        console.error('Batch translation error:', error);
        const fallbackMap: { [key: string]: string } = {};
        keys.forEach(key => {
          fallbackMap[key] = key;
        });
        setTranslations(fallbackMap);
      } finally {
        setLoading(false);
      }
    };

    fetchTranslations();
  }, [keys.join(','), tBatch]);

  return { translations, loading };
};