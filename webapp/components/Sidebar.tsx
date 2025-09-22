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
    <div className="w-80 bg-[#ffffff] shadow-lg h-screen overflow-y-auto">
      <div className="p-4 border-b border-[#fca311]">
        <h2 className="text-xl font-bold text-[#14213d]">{chaptersText}</h2>
        <p className="text-sm text-[#fca311]">{gitaText}</p>
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
                className={`w-full px-4 py-3 text-left hover:bg-[#fca311]/10 transition-colors duration-200 flex items-start justify-between group ${
                  isActive ? 'bg-[#fca311]/20 border-r-4 border-[#fca311]' : ''
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="text-sm font-medium text-[#fca311] flex-shrink-0">
                      Ch. {chapter.id}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#14213d] group-hover:text-[#fca311] truncate">
                        {chapter.title}
                      </p>
                      <p className="text-xs text-[#fca311] font-medium truncate">
                        {chapter.sanskritTitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#14213d] mb-2 line-clamp-2">
                    {chapter.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#fca311]">
                      {chapter.verseCount} verses
                    </span>
                    {progress > 0 && (
                      <span className="text-xs text-green-600 font-medium">
                        {progress}% complete
                      </span>
                    )}
                  </div>

                  {progress > 0 && (
                    <div className="mt-2 w-full bg-[#e5e5e5] rounded-full h-1.5">
                      <div
                        className="bg-[#fca311] h-1.5 rounded-full transition-all duration-300"
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
                <div className="bg-[#e5e5e5] px-4 py-2 border-t border-[#fca311]">
                  <div className="space-y-1 max-h-60 overflow-y-auto">
                    {Array.from({ length: chapter.verseCount }, (_, i) => i + 1).map((verseNum) => {
                      const isCurrentVerse = currentChapter === chapter.id && currentVerse === verseNum;
                      const bookmarked = isBookmarked(chapter.id, verseNum);

                      return (
                        <div
                          key={verseNum}
                          className={`flex items-center justify-between px-3 py-2 rounded transition-colors duration-200 ${
                            isCurrentVerse
                              ? 'bg-[#fca311]/30 text-[#14213d]'
                              : 'hover:bg-[#fca311]/20 text-[#14213d]'
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
                                ? 'text-[#fca311] hover:text-[#e5a00f]'
                                : 'text-[#14213d] hover:text-[#fca311]'
                            }`}
                          >
                            <svg className="w-4 h-4" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
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