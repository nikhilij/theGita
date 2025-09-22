"use client";

import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import VerseDisplay from "@/components/VerseDisplay";
import { AppProvider, useApp } from "@/components/AppContext";
import { useTranslation } from "@/components/useTranslation";

function ReadContent() {
  const { currentChapter, currentVerse } = useApp();
  const readerTitle = useTranslation('reader.title');
  const selectChapter = useTranslation('reader.selectChapter');

  return (
    <div className="min-h-screen bg-[#e5e5e5] flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 container mx-auto px-4 py-8">
          {currentChapter && currentVerse ? (
            <VerseDisplay chapterId={currentChapter} verseId={currentVerse} />
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🕉️</div>
              <h2 className="text-2xl font-bold text-[#14213d] mb-4">{readerTitle}</h2>
              <p className="text-[#14213d] text-lg">{selectChapter}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ReadPage() {
  return (
    <AppProvider>
      <ReadContent />
    </AppProvider>
  );
}
