"use client";

import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { AppProvider } from '../../components/AppContext';
import { useLanguage } from '../../components/LanguageContext';

export default function ReadPage() {
  const { t } = useLanguage();
  
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#e5e5e5] flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-[#14213d] mb-4">{t('reader.title')}</h2>
            <p className="text-[#14213d]">{t('reader.selectChapter')}</p>
          </main>
        </div>
      </div>
    </AppProvider>
  );
}
