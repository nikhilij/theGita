"use client";

import React, { useState } from 'react';
import { useApp } from './AppContext';
import SearchBar from './SearchBar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isQuickJumpOpen, setIsQuickJumpOpen] = useState(false);
  const { chapters, setCurrentChapter, currentChapter } = useApp();

  const handleChapterSelect = (chapterId: number) => {
    setCurrentChapter(chapterId);
    setIsQuickJumpOpen(false);
  };
  const pathname = usePathname();

  return (
    <header className="bg-gradient-to-r from-[#14213d] to-[#002447] text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo/Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#ffffff] rounded-full flex items-center justify-center">
            <span className="text-[#fca311] font-bold text-xl">ॐ</span>
          </div>
          <div>
            <Link href="/" className="hover:text-[#fca311] transition-colors duration-200">
              <h1 className="text-2xl font-bold cursor-pointer">Bhagavad Gita</h1>
            </Link>
            <p className="text-sm opacity-90">Divine Wisdom</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {/* Quick Jump Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsQuickJumpOpen(!isQuickJumpOpen)}
              className="flex items-center space-x-2 hover:text-[#fca311] transition-colors duration-200 font-medium"
            >
              <span>Quick Jump</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isQuickJumpOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isQuickJumpOpen && (
              <div className="absolute top-full mt-2 w-80 bg-[#ffffff] rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                <div className="p-2">
                  <h3 className="text-sm font-semibold text-[#14213d] mb-2 px-2">Jump to Chapter</h3>
                  <div className="space-y-1">
                    {chapters.map((chapter) => (
                      <button
                        key={chapter.id}
                        onClick={() => handleChapterSelect(chapter.id)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                          currentChapter === chapter.id
                            ? 'bg-[#fca311]/20 text-[#14213d]'
                            : 'hover:bg-[#e5e5e5] text-[#14213d]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">Chapter {chapter.id}</span>
                            <span className="text-sm text-[#fca311] ml-2">{chapter.title}</span>
                          </div>
                          <span className="text-xs text-[#fca311]">{chapter.verseCount} verses</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <a href="#about" className="hover:text-[#fca311] transition-colors duration-200 font-medium">
            About
          </a>
          {/* Search is available on the reader page - rendered in header when on /read */}
          <a href="#settings" className="hover:text-[#fca311] transition-colors duration-200 font-medium">
            Settings
          </a>
        </nav>

        {/* Render search when on /read */}
        {pathname === '/read' && (
          <div className="hidden md:block md:ml-6">
            <SearchBar />
          </div>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-[#002447] px-4 py-2">
        <nav className="flex flex-col space-y-2">
          <button
            onClick={() => setIsQuickJumpOpen(!isQuickJumpOpen)}
            className="flex items-center justify-between text-white hover:text-[#fca311] transition-colors duration-200"
          >
            <span>Quick Jump</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isQuickJumpOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isQuickJumpOpen && (
            <div className="mt-2 space-y-1">
              {chapters.slice(0, 6).map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => handleChapterSelect(chapter.id)}
                  className="w-full text-left px-3 py-2 text-white hover:bg-[#fca311]/20 rounded transition-colors duration-200"
                >
                  Ch. {chapter.id}: {chapter.title}
                </button>
              ))}
              {chapters.length > 6 && (
                <p className="text-xs text-[#fca311] px-3 py-1">... and {chapters.length - 6} more chapters</p>
              )}
            </div>
          )}

          <a href="#about" className="text-white hover:text-[#fca311] transition-colors duration-200">
            About
          </a>
          <a href="#search" className="text-white hover:text-[#fca311] transition-colors duration-200">
            Search
          </a>
          <a href="#settings" className="text-white hover:text-[#fca311] transition-colors duration-200">
            Settings
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
