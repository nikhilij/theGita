"use client";

import React, { useState } from 'react';
import { useApp } from './AppContext';
import { useLanguage } from './LanguageContext';
import { useTranslation } from './useTranslation';

const SearchBar: React.FC = () => {
  const { chapters, setCurrentChapter } = useApp();
  const searchPlaceholder = useTranslation('search.placeholder');
  const searchButton = useTranslation('search.button');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof chapters>([]);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      return;
    }

    const lower = q.toLowerCase();
    const filtered = chapters.filter(c => c.title.toLowerCase().includes(lower) || c.sanskritTitle.toLowerCase().includes(lower));
    setResults(filtered);
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-2">
        <input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="flex-1 px-4 py-2 rounded-lg border border-[#fca311] bg-[#ffffff] text-[#14213d]"
        />
        <button
          onClick={() => {
            if (results.length === 1) setCurrentChapter(results[0].id);
          }}
          className="px-4 py-2 bg-[#fca311] hover:bg-[#e5a00f] text-[#14213d] rounded-lg"
        >
          {searchButton}
        </button>
      </div>

      {results.length > 0 && (
        <div className="mt-2 bg-[#ffffff] border border-[#fca311] rounded-lg shadow-sm max-h-48 overflow-y-auto">
          {results.map(r => (
            <button
              key={r.id}
              onClick={() => setCurrentChapter(r.id)}
              className="w-full text-left px-3 py-2 hover:bg-[#e5e5e5] text-[#14213d]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Chapter {r.id}: {r.title}</div>
                  <div className="text-sm text-[#fca311]">{r.sanskritTitle}</div>
                </div>
                <div className="text-sm text-[#fca311]">{r.verseCount}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;