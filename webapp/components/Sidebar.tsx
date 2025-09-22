"use client";

import React, { useState } from 'react';
import { useApp } from './AppContext';
import { useLanguage } from './LanguageContext';
import { useTranslation } from './useTranslation';

const Sidebar: React.FC = () => {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const chaptersText = useTranslation('reader.chapters');
  const gitaText = useTranslation('reader.gita');
  const {
    chapters,
    currentChapter,
    currentVerse,
    setCurrentChapter,
    setCurrentVerse,
    getChapterProgress,
    isBookmarked,
    addBookmark,
    removeBookmark,
    updateProgress
  } = useApp();

  const toggleChapter = (chapterId: number) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
  };

  const handleVerseClick = (chapterId: number, verseId: number) => {
    setCurrentVerse(chapterId, verseId);
    updateProgress(chapterId, verseId);
  };

  const toggleBookmark = (chapterId: number, verseId: number) => {
    if (isBookmarked(chapterId, verseId)) {
      removeBookmark(chapterId, verseId);
    } else {
      addBookmark(chapterId, verseId);
    }
  };

  return (
    <div className="w-80 bg-[#ffffff] shadow-lg h-screen overflow-y-auto custom-scrollbar border-r border-[#fca311]/10">
      <div className="p-5 border-b border-[#fca311]/20 bg-gradient-to-r from-[#fca311]/5 to-transparent">
        <h2 className="text-xl font-bold text-[#14213d] flex items-center">
          <span className="mr-2">📜</span>
          {chaptersText}
        </h2>
        <p className="text-sm text-[#fca311] font-medium mt-1">{gitaText}</p>
      </div>

      <div className="py-2">
        {chapters.map((chapter) => {
          const progress = getChapterProgress(chapter.id);
          const isActive = currentChapter === chapter.id;

          return (
            <div key={chapter.id} className="border-b border-[#e5e5e5] last:border-b-0">
              <button
                onClick={() => {
                  toggleChapter(chapter.id);
                  setCurrentChapter(chapter.id);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-[#fca311]/10 transition-all duration-200 flex items-start justify-between group ${
                  isActive ? 'bg-[#fca311]/15 border-r-4 border-[#fca311] shadow-sm' : ''
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-1.5">
                    <span className="text-sm font-semibold bg-[#fca311]/15 text-[#fca311] px-2 py-0.5 rounded-md flex-shrink-0 mr-2">
                      {chapter.id}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#14213d] group-hover:text-[#fca311] truncate transition-colors duration-200">
                        {chapter.title}
                      </p>
                      <p className="text-xs text-[#fca311] font-medium truncate mt-0.5">
                        {chapter.sanskritTitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#14213d]/80 mb-2.5 line-clamp-2 group-hover:text-[#14213d] transition-colors duration-200">
                    {chapter.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-[#14213d]/5 text-[#14213d]/80 px-2 py-0.5 rounded-full">
                      {chapter.verseCount} verses
                    </span>
                    {progress > 0 && (
                      <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                        {progress}% complete
                      </span>
                    )}
                  </div>

                  {progress > 0 && (
                    <div className="mt-2.5 w-full bg-[#e5e5e5] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#fca311] h-1.5 rounded-full transition-all duration-300 shadow-inner"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>

                <svg
                  className={`w-5 h-5 text-[#fca311] transition-transform duration-200 flex-shrink-0 ml-2 ${
                    expandedChapter === chapter.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedChapter === chapter.id && (
                <div className="bg-[#f9f9f9] px-4 py-2 border-t border-[#fca311]/20">
                  <div className="space-y-0.5 max-h-60 overflow-y-auto pr-1 custom-verses-scrollbar">
                    {Array.from({ length: chapter.verseCount }, (_, i) => i + 1).map((verseNum) => {
                      const isCurrentVerse = currentChapter === chapter.id && currentVerse === verseNum;
                      const bookmarked = isBookmarked(chapter.id, verseNum);

                      return (
                        <div
                          key={verseNum}
                          className={`flex items-center justify-between px-3 py-2 rounded-md transition-all duration-200 ${
                            isCurrentVerse
                              ? 'bg-[#fca311]/30 text-[#14213d] shadow-sm'
                              : 'hover:bg-[#fca311]/10 text-[#14213d]'
                          }`}
                        >
                          <button
                            onClick={() => handleVerseClick(chapter.id, verseNum)}
                            className="flex-1 text-left text-sm"
                          >
                            Verse {verseNum}
                          </button>
                          <button
                            onClick={() => toggleBookmark(chapter.id, verseNum)}
                            className={`ml-2 p-1 rounded transition-colors duration-200 ${
                              bookmarked
                                ? 'text-[#fca311]'
                                : 'text-[#14213d]/70 hover:text-[#fca311]'
                            }`}
                            aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
                          >
                            <svg className="w-4 h-4" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={bookmarked ? 1.5 : 2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;