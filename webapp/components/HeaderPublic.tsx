import React from 'react';
import Link from 'next/link';
import LanguageSelector from './LanguageSelector';

const HeaderPublic: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-orange-600 font-bold text-xl">ॐ</span>
          </div>
          <div>
            <Link href="/" className="hover:text-orange-200 transition-colors duration-200">
              <h1 className="text-2xl font-bold cursor-pointer">Bhagavad Gita</h1>
            </Link>
            <p className="text-sm opacity-90">Divine Wisdom</p>
          </div>
        </div>

        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/read" className="hover:text-orange-200 transition-colors duration-200 font-medium">
            Start Reading
          </Link>
          <a href="#features" className="hover:text-orange-200 transition-colors duration-200 font-medium">
            Features
          </a>
          <a href="#about" className="hover:text-orange-200 transition-colors duration-200 font-medium">
            About
          </a>
          <a href="#contact" className="hover:text-orange-200 transition-colors duration-200 font-medium">
            Contact
          </a>
          <LanguageSelector />
        </nav>

        <div className="md:hidden flex items-center space-x-4">
          <LanguageSelector />
          <Link href="/read" className="px-3 py-2 bg-white text-orange-600 rounded-md font-medium">Start</Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderPublic;