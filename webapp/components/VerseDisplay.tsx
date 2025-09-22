"use client";

import React from 'react';
import { useApp } from './AppContext';
import { useLanguage } from './LanguageContext';

interface VerseDisplayProps {
  chapterId: number;
  verseId: number;
}

const VerseDisplay: React.FC<VerseDisplayProps> = ({ chapterId, verseId }) => {
  const { chapters } = useApp();
  const { language } = useLanguage();

  const chapter = chapters.find(c => c.id === chapterId);

  // Mock verse data - in a real app, this would come from an API or data source
  const mockVerses = {
    1: {
      1: {
        en: {
          sanskrit: "धृतराष्ट्र उवाच\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥१॥",
          translation: "Dhritarashtra said: O Sanjay, assembled in the holy field of Kurukshetra, eager to fight, what did my sons and the sons of Pandu do?",
          explanation: "The blind king Dhritarashtra asks his minister Sanjay about the events on the battlefield of Kurukshetra where the Kauravas and Pandavas have gathered for war."
        },
        hi: {
          sanskrit: "धृतराष्ट्र उवाच\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥१॥",
          translation: "धृतराष्ट्र ने कहा: हे संजय, धर्मक्षेत्र कुरुक्षेत्र में एकत्र हुए युद्ध के लिए उत्सुक, मेरे पुत्रों और पाण्डु के पुत्रों ने क्या किया?",
          explanation: "अंधा राजा धृतराष्ट्र अपने मंत्री संजय से पूछता है कि कुरुक्षेत्र के युद्धक्षेत्र में क्या हुआ है जहां कौरव और पाण्डव युद्ध के लिए एकत्र हुए हैं।"
        },
        sa: {
          sanskrit: "धृतराष्ट्र उवाच\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥१॥",
          translation: "धृतराष्ट्र उवाच\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥१॥",
          explanation: "धृतराष्ट्रोऽब्रवीत्\nधर्मक्षेत्रे कुरुक्षेत्रे समवेताः युयुत्सवः ।\nमम पुत्राः पाण्डुपुत्राश्च किमकुर्वत हे संजय ॥१॥"
        }
      }
    }
  };

  const verseData = (mockVerses as any)[chapterId]?.[verseId];

  if (!chapter || !verseData) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">📖</div>
        <p className="text-[#fca311]">Verse content will be loaded here</p>
      </div>
    );
  }

  const currentVerse = verseData[language] || verseData.en;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Chapter Header */}
      <div className="text-center border-b border-[#fca311]/30 pb-6">
        <h1 className="chapter-title text-[#14213d] mb-2">
          Chapter {chapter.id}: {chapter.title}
        </h1>
        <h2 className="sanskrit-text text-[#fca311] mb-4">
          {chapter.sanskritTitle}
        </h2>
        <p className="text-[#14213d] max-w-2xl mx-auto">
          {chapter.description}
        </p>
      </div>

      {/* Verse Number */}
      <div className="text-center">
        <div className="inline-block bg-[#fca311]/10 px-4 py-2 rounded-full">
          <span className="text-[#fca311] font-semibold">
            Verse {verseId}
          </span>
        </div>
      </div>


      {/* Sanskrit Text */}
      <div className="verse verse-sanskrit">
        <h3 className="text-lg font-semibold text-[#14213d] mb-4 text-center">
          Sanskrit Text
        </h3>
        <div className="whitespace-pre-line text-center leading-loose">
          {currentVerse.sanskrit}
        </div>
      </div>

      {/* Translation */}
      <div className="verse verse-translation">
        <h3 className="text-lg font-semibold text-[#14213d] mb-4 text-center">
          Translation
        </h3>
        <div>
          {currentVerse.translation}
        </div>
      </div>

      {/* Explanation */}
      <div className="verse verse-translation">
        <h3 className="text-lg font-semibold text-[#14213d] mb-4 text-center">
          Explanation
        </h3>
        <div>
          {currentVerse.explanation}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-[#fca311]/30">
        <button
          className="px-6 py-3 bg-[#fca311] hover:bg-[#e5a00f] text-[#14213d] rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={verseId <= 1}
        >
          ← Previous Verse
        </button>

        <div className="text-sm text-[#fca311]">
          {verseId} of {chapter.verseCount} verses
        </div>

        <button
          className="px-6 py-3 bg-[#fca311] hover:bg-[#e5a00f] text-[#14213d] rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={verseId >= chapter.verseCount}
        >
          Next Verse →
        </button>
      </div>
    </div>
  );
};

export default VerseDisplay;