"use client";

import React from 'react';
import { useApp } from './AppContext';

const Bookmarks: React.FC = () => {
  const { bookmarks, chapters, setCurrentVerse, removeBookmark } = useApp();

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📖</div>
        <h3 className="text-xl font-semibold text-[#14213d] mb-2">No Bookmarks Yet</h3>
        <p className="text-[#fca311]">Bookmark verses as you read to see them here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-[#14213d] mb-6">Your Bookmarks</h2>
      <div className="space-y-3">
        {bookmarks.map((bookmark, index) => {
          const chapter = chapters.find(c => c.id === bookmark.chapterId);
          return (
            <div
              key={`${bookmark.chapterId}-${bookmark.verseId}-${index}`}
              className="bg-[#ffffff] border border-[#fca311] p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm font-medium text-[#fca311]">
                      Chapter {bookmark.chapterId}
                    </span>
                    <span className="text-sm text-[#14213d]">•</span>
                    <span className="text-sm text-[#14213d]">
                      Verse {bookmark.verseId}
                    </span>
                  </div>
                  <h3 className="font-medium text-[#14213d] mb-1">
                    {chapter?.title}
                  </h3>
                  <p className="text-sm text-[#fca311]">
                    {chapter?.description}
                  </p>
                  <p className="text-xs text-[#14213d] mt-2">
                    Bookmarked on {bookmark.timestamp.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => setCurrentVerse(bookmark.chapterId, bookmark.verseId)}
                    className="px-3 py-1 bg-[#fca311] hover:bg-[#e5a00f] text-[#14213d] text-sm rounded transition-colors duration-200"
                  >
                    Go to Verse
                  </button>
                  <button
                    onClick={() => removeBookmark(bookmark.chapterId, bookmark.verseId)}
                    className="p-1 text-[#fca311] hover:text-[#e5a00f] transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bookmarks;