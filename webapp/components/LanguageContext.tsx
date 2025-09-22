"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translateWithHuggingFace, translateBatch } from '../lib/translationService';

export type Language = 'en' | 'hi' | 'sa' | 'es' | 'ar' | 'fr' | 'de' | 'zh' | 'ja' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => Promise<string>;
  tBatch: (keys: string[]) => Promise<string[]>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Define translations at module level for both functions to access
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.read': 'Start Reading',
    'nav.features': 'Features',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.settings': 'Settings',

    // Header
    'header.title': 'Bhagavad Gita',
    'header.subtitle': 'Divine Wisdom',
    'header.quickJump': 'Quick Jump',

    // Homepage
    'home.hero.title': 'Discover the Divine Wisdom',
    'home.hero.subtitle': 'Bhagavad Gita',
    'home.hero.description': 'Read, listen, and explore the Bhagavad Gita chapter by chapter. Our interactive UI supports multi-language translations, high-quality text-to-voice recitations, bookmarks, and progress tracking.',
    'home.hero.startReading': 'Start Reading',
    'home.hero.learnMore': 'Learn more',

    // Features
    'features.title': 'Discover the Divine Wisdom',
    'features.subtitle': 'Experience the Bhagavad Gita like never before with our comprehensive reading platform',
    'features.completeText.title': 'Complete Text',
    'features.completeText.description': 'Access all 18 chapters and 700 verses of the Bhagavad Gita with beautiful formatting and clear typography for an immersive reading experience.',
    'features.smartSearch.title': 'Smart Search',
    'features.smartSearch.description': 'Find specific verses, chapters, or concepts instantly with our powerful search functionality that works across both English and Sanskrit text.',
    'features.bookmarks.title': 'Bookmarks',
    'features.bookmarks.description': 'Save your favorite verses and create personalized collections. Never lose track of the passages that resonate with your soul.',
    'features.progress.title': 'Progress Tracking',
    'features.progress.description': 'Monitor your reading journey with detailed progress indicators. See how much of each chapter you have completed and stay motivated.',
    'features.audio.title': 'Audio Recitations',
    'features.audio.description': 'Listen to divine recitations while you read. Experience the sacred verses through traditional chanting and modern audio quality.',
    'features.multilang.title': 'Multi-Language',
    'features.multilang.description': 'Explore the Gita in multiple languages including Sanskrit, English, and other regional translations for deeper understanding.',

    // CTA
    'cta.title': 'Begin Your Spiritual Journey',
    'cta.description': 'Join thousands of seekers who have found wisdom, peace, and enlightenment through the teachings of the Bhagavad Gita.',
    'cta.button': 'Start Your Journey',

    // Reader
    'reader.title': 'Reader',
    'reader.selectChapter': 'Select a chapter from the sidebar to begin reading.',
    'reader.chapters': 'Chapters',
    'reader.gita': 'Bhagavad Gita',

    // Search
    'search.placeholder': 'Search chapters or Sanskrit titles...',
    'search.button': 'Search',

    // Chapter titles
    'chapter.1.title': 'Arjuna Visada Yoga',
    'chapter.1.subtitle': 'The Yoga of Arjuna\'s Dejection',
    'chapter.2.title': 'Sankhya Yoga',
    'chapter.2.subtitle': 'The Yoga of Knowledge',
    'chapter.3.title': 'Karma Yoga',
    'chapter.3.subtitle': 'The Yoga of Action',
    'chapter.4.title': 'Jnana Karma Sannyasa Yoga',
    'chapter.4.subtitle': 'The Yoga of Knowledge and Renunciation of Action',
    'chapter.5.title': 'Karma Sannyasa Yoga',
    'chapter.5.subtitle': 'The Yoga of Renunciation of Action',
    'chapter.6.title': 'Atma Samyama Yoga',
    'chapter.6.subtitle': 'The Yoga of Self-Control',
    'chapter.7.title': 'Paramahamsa Vijnana Yoga',
    'chapter.7.subtitle': 'The Yoga of Knowledge and Realization',
    'chapter.8.title': 'Aksara Brahma Yoga',
    'chapter.8.subtitle': 'The Yoga of the Imperishable Brahman',
    'chapter.9.title': 'Raja Vidya Guhya Yoga',
    'chapter.9.subtitle': 'The Yoga of Royal Knowledge and Royal Secret',
    'chapter.10.title': 'Vibhuti Yoga',
    'chapter.10.subtitle': 'The Yoga of Divine Glories',
    'chapter.11.title': 'Visvarupa Darshana Yoga',
    'chapter.11.subtitle': 'The Yoga of the Vision of the Universal Form',
    'chapter.12.title': 'Bhakti Yoga',
    'chapter.12.subtitle': 'The Yoga of Devotion',
    'chapter.13.title': 'Ksetra Ksetrajna Vibhaga Yoga',
    'chapter.13.subtitle': 'The Yoga of Distinction between the Field and the Knower of the Field',
    'chapter.14.title': 'Gunatraya Vibhaga Yoga',
    'chapter.14.subtitle': 'The Yoga of Division of Three Gunas',
    'chapter.15.title': 'Purusottama Yoga',
    'chapter.15.subtitle': 'The Yoga of the Supreme Person',
    'chapter.16.title': 'Daivasura Sampad Vibhaga Yoga',
    'chapter.16.subtitle': 'The Yoga of Division between Divine and Demoniac Endowments',
    'chapter.17.title': 'Sraddhatraya Vibhaga Yoga',
    'chapter.17.subtitle': 'The Yoga of Division of Threefold Faith',
    'chapter.18.title': 'Moksa Sannyasa Yoga',
    'chapter.18.subtitle': 'The Yoga of Liberation by Renunciation',

    // Verse Components
    'verse.sanskrit': 'Sanskrit',
    'verse.transliteration': 'Transliteration',
    'verse.translation': 'Translation',
    'verse.commentary': 'Commentary',
    'verse.play': 'Play Audio',
    'verse.pause': 'Pause Audio',
    'verse.bookmark': 'Bookmark',
    'verse.unbookmark': 'Remove Bookmark',
    'verse.share': 'Share Verse',

    // Sidebar
    'sidebar.chapters': 'Chapters',
    'sidebar.bookmarks': 'Bookmarks',
    'sidebar.progress': 'Progress',
    'sidebar.settings': 'Settings',

    // Bookmarks
    'bookmarks.title': 'Your Bookmarks',
    'bookmarks.empty': 'No bookmarks yet. Start reading and bookmark your favorite verses!',
    'bookmarks.verse': 'Verse',
    'bookmarks.chapter': 'Chapter',
    'bookmarks.remove': 'Remove',

    // Settings
    'settings.language': 'Language',
    'settings.fontSize': 'Font Size',
    'settings.theme': 'Theme',
    'settings.audio': 'Audio Settings',
    'settings.save': 'Save Settings',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.retry': 'Retry',
    'common.close': 'Close',
    'common.ok': 'OK',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.previous': 'Previous',
    'common.next': 'Next'
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('gita-language') as Language;
    if (savedLanguage && ['en', 'hi', 'sa', 'es', 'ar', 'fr', 'de', 'zh', 'ja', 'ru'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('gita-language', lang);
  };

  // Translation function - async for dynamic translations
  const t = async (key: string): Promise<string> => {
    if (language === 'en') {
      return (translations as any).en[key] || key;
    }

    // Try to find the translation in the defined translations
    const langTranslations = (translations as any)[language];
    if (langTranslations && langTranslations[key]) {
      return langTranslations[key];
    }

    // For unsupported languages, translate from English
    const englishText = (translations as any).en[key];
    if (englishText) {
      try {
        return await translateWithHuggingFace(englishText, language, 'en');
      } catch (error) {
        console.error('Translation failed:', error);
        return englishText; // Fallback to English
      }
    }

    return key; // Fallback to key
  };

  // Batch translation function
  const tBatch = async (keys: string[]): Promise<string[]> => {
    if (language === 'en' || !keys.length) {
      return keys.map(key => (translations as any).en[key] || key);
    }

    // Get English texts for all keys
    const englishTexts = keys.map(key => (translations as any).en[key] || key);
    
    try {
      return await translateBatch(englishTexts, language, 'en');
    } catch (error) {
      console.error('Batch translation failed:', error);
      return englishTexts; // Fallback to English
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tBatch }}>
      {children}
    </LanguageContext.Provider>
  );
};
