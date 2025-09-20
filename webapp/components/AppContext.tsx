"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Chapter {
  id: number;
  title: string;
  sanskritTitle: string;
  verseCount: number;
  description: string;
}

interface Bookmark {
  chapterId: number;
  verseId: number;
  timestamp: Date;
}

interface Progress {
  chapterId: number;
  completedVerses: number[];
  lastReadVerse: number;
}

interface AppContextType {
  chapters: Chapter[];
  currentChapter: number | null;
  currentVerse: number | null;
  bookmarks: Bookmark[];
  progress: Progress[];
  setCurrentChapter: (chapterId: number) => void;
  setCurrentVerse: (chapterId: number, verseId: number) => void;
  addBookmark: (chapterId: number, verseId: number) => void;
  removeBookmark: (chapterId: number, verseId: number) => void;
  updateProgress: (chapterId: number, verseId: number) => void;
  getChapterProgress: (chapterId: number) => number;
  isBookmarked: (chapterId: number, verseId: number) => boolean;
}

const chaptersData: Chapter[] = [
  {
    id: 1,
    title: "Arjuna Vishada Yoga",
    sanskritTitle: "अर्जुनविषादयोग",
    verseCount: 47,
    description: "Arjuna's depression and Krishna's counsel in the battlefield"
  },
  {
    id: 2,
    title: "Sankhya Yoga",
    sanskritTitle: "सांख्ययोग",
    verseCount: 72,
    description: "The science of self-realization and the nature of the soul"
  },
  {
    id: 3,
    title: "Karma Yoga",
    sanskritTitle: "कर्मयोग",
    verseCount: 43,
    description: "The path of selfless action and duty"
  },
  {
    id: 4,
    title: "Jnana Karma Sanyasa Yoga",
    sanskritTitle: "ज्ञानकर्मसंन्यासयोग",
    verseCount: 42,
    description: "The renunciation of action through knowledge"
  },
  {
    id: 5,
    title: "Karma Sanyasa Yoga",
    sanskritTitle: "कर्मसंन्यासयोग",
    verseCount: 29,
    description: "The practice of true renunciation"
  },
  {
    id: 6,
    title: "Dhyana Yoga",
    sanskritTitle: "ध्यानयोग",
    verseCount: 47,
    description: "The yoga of meditation and self-control"
  },
  {
    id: 7,
    title: "Jnana Vijñana Yoga",
    sanskritTitle: "ज्ञानविज्ञानयोग",
    verseCount: 30,
    description: "The yoga of knowledge and realization"
  },
  {
    id: 8,
    title: "Aksara Brahma Yoga",
    sanskritTitle: "अक्षरब्रह्मयोग",
    verseCount: 28,
    description: "The imperishable Brahman and devotional service"
  },
  {
    id: 9,
    title: "Raja Vidya Raja Guhya Yoga",
    sanskritTitle: "राजविद्याराजगुह्ययोग",
    verseCount: 34,
    description: "The most confidential knowledge and devotion"
  },
  {
    id: 10,
    title: "Vibhuti Yoga",
    sanskritTitle: "विभूतियोग",
    verseCount: 42,
    description: "The divine manifestations and glories of God"
  },
  {
    id: 11,
    title: "Visvarupa Darsana Yoga",
    sanskritTitle: "विश्वरूपदर्शनयोग",
    verseCount: 55,
    description: "The vision of the universal form of God"
  },
  {
    id: 12,
    title: "Bhakti Yoga",
    sanskritTitle: "भक्तियोग",
    verseCount: 20,
    description: "The yoga of devotion and love for God"
  },
  {
    id: 13,
    title: "Ksetra Ksetrajña Vibhaga Yoga",
    sanskritTitle: "क्षेत्रक्षेत्रज्ञविभागयोग",
    verseCount: 35,
    description: "The field and the knower of the field"
  },
  {
    id: 14,
    title: "Gunatraya Vibhaga Yoga",
    sanskritTitle: "गुणत्रयविभागयोग",
    verseCount: 27,
    description: "The three modes of material nature"
  },
  {
    id: 15,
    title: "Purusottama Yoga",
    sanskritTitle: "पुरुषोत्तमयोग",
    verseCount: 20,
    description: "The supreme person beyond the material world"
  },
  {
    id: 16,
    title: "Daivasura Sampad Vibhaga Yoga",
    sanskritTitle: "दैवासुरसम्पद्विभागयोग",
    verseCount: 24,
    description: "The divine and demoniac natures"
  },
  {
    id: 17,
    title: "Sraddhatraya Vibhaga Yoga",
    sanskritTitle: "श्रद्धात्रयविभागयोग",
    verseCount: 28,
    description: "The three divisions of faith and understanding"
  },
  {
    id: 18,
    title: "Moksa Sanyasa Yoga",
    sanskritTitle: "मोक्षसंन्यासयोग",
    verseCount: 78,
    description: "The path of liberation through renunciation"
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentChapter, setCurrentChapterState] = useState<number | null>(null);
  const [currentVerse, setCurrentVerseState] = useState<number | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('gita-bookmarks');
    const savedProgress = localStorage.getItem('gita-progress');
    const savedCurrentChapter = localStorage.getItem('gita-current-chapter');
    const savedCurrentVerse = localStorage.getItem('gita-current-verse');

    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    if (savedCurrentChapter) {
      setCurrentChapterState(parseInt(savedCurrentChapter));
    }
    if (savedCurrentVerse) {
      setCurrentVerseState(parseInt(savedCurrentVerse));
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('gita-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('gita-progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    if (currentChapter !== null) {
      localStorage.setItem('gita-current-chapter', currentChapter.toString());
    }
  }, [currentChapter]);

  useEffect(() => {
    if (currentVerse !== null) {
      localStorage.setItem('gita-current-verse', currentVerse.toString());
    }
  }, [currentVerse]);

  const setCurrentChapter = (chapterId: number) => {
    setCurrentChapterState(chapterId);
  };

  const setCurrentVerse = (chapterId: number, verseId: number) => {
    setCurrentChapterState(chapterId);
    setCurrentVerseState(verseId);
  };

  const addBookmark = (chapterId: number, verseId: number) => {
    const newBookmark: Bookmark = {
      chapterId,
      verseId,
      timestamp: new Date()
    };
    setBookmarks(prev => [...prev, newBookmark]);
  };

  const removeBookmark = (chapterId: number, verseId: number) => {
    setBookmarks(prev => prev.filter(b => !(b.chapterId === chapterId && b.verseId === verseId)));
  };

  const updateProgress = (chapterId: number, verseId: number) => {
    setProgress(prev => {
      const existing = prev.find(p => p.chapterId === chapterId);
      if (existing) {
        if (!existing.completedVerses.includes(verseId)) {
          return prev.map(p =>
            p.chapterId === chapterId
              ? {
                  ...p,
                  completedVerses: [...p.completedVerses, verseId],
                  lastReadVerse: verseId
                }
              : p
          );
        }
        return prev;
      } else {
        return [...prev, {
          chapterId,
          completedVerses: [verseId],
          lastReadVerse: verseId
        }];
      }
    });
  };

  const getChapterProgress = (chapterId: number): number => {
    const chapterProgress = progress.find(p => p.chapterId === chapterId);
    if (!chapterProgress) return 0;

    const chapter = chaptersData.find(c => c.id === chapterId);
    if (!chapter) return 0;

    return Math.round((chapterProgress.completedVerses.length / chapter.verseCount) * 100);
  };

  const isBookmarked = (chapterId: number, verseId: number): boolean => {
    return bookmarks.some(b => b.chapterId === chapterId && b.verseId === verseId);
  };

  const value: AppContextType = {
    chapters: chaptersData,
    currentChapter,
    currentVerse,
    bookmarks,
    progress,
    setCurrentChapter,
    setCurrentVerse,
    addBookmark,
    removeBookmark,
    updateProgress,
    getChapterProgress,
    isBookmarked
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};