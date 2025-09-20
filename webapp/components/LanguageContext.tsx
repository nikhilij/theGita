"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'sa';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('gita-language') as Language;
    if (savedLanguage && ['en', 'hi', 'sa'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('gita-language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    const translations = {
      en: {
        // Navigation
        'nav.home': 'Home',
        'nav.read': 'Start Reading',
        'nav.features': 'Features',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.settings': 'Settings',

        // Header
        'header.title': 'Bhagavad Gita',
        'header.subtitle': 'Divine Wisdom',
        'header.quickJump': 'Quick Jump',

        // Homepage
        'home.hero.title': 'Discover the Divine Wisdom',
        'home.hero.subtitle': 'Bhagavad Gita',
        'home.hero.description': 'Read, listen, and explore the Bhagavad Gita chapter by chapter. Our interactive UI supports multi-language translations, high-quality text-to-voice recitations, bookmarks, and progress tracking.',
        'home.hero.startReading': 'Start Reading',
        'home.hero.learnMore': 'Learn more',

        // Features
        'features.title': 'Discover the Divine Wisdom',
        'features.subtitle': 'Experience the Bhagavad Gita like never before with our comprehensive reading platform',
        'features.completeText.title': 'Complete Text',
        'features.completeText.description': 'Access all 18 chapters and 700 verses of the Bhagavad Gita with beautiful formatting and clear typography for an immersive reading experience.',
        'features.smartSearch.title': 'Smart Search',
        'features.smartSearch.description': 'Find specific verses, chapters, or concepts instantly with our powerful search functionality that works across both English and Sanskrit text.',
        'features.bookmarks.title': 'Bookmarks',
        'features.bookmarks.description': 'Save your favorite verses and create personalized collections. Never lose track of the passages that resonate with your soul.',
        'features.progress.title': 'Progress Tracking',
        'features.progress.description': 'Monitor your reading journey with detailed progress indicators. See how much of each chapter you&apos;ve completed and stay motivated.',
        'features.audio.title': 'Audio Recitations',
        'features.audio.description': 'Listen to divine recitations while you read. Experience the sacred verses through traditional chanting and modern audio quality.',
        'features.multilang.title': 'Multi-Language',
        'features.multilang.description': 'Explore the Gita in multiple languages including Sanskrit, English, and other regional translations for deeper understanding.',

        // CTA
        'cta.title': 'Begin Your Spiritual Journey',
        'cta.description': 'Join thousands of seekers who have found wisdom, peace, and enlightenment through the teachings of the Bhagavad Gita.',
        'cta.button': 'Start Your Journey',

        // Reader
        'reader.title': 'Reader',
        'reader.selectChapter': 'Select a chapter from the sidebar to begin reading.',
        'reader.chapters': 'Chapters',
        'reader.gita': 'Bhagavad Gita',

        // Search
        'search.placeholder': 'Search chapters or Sanskrit titles...',
        'search.button': 'Search',

        // Bookmarks
        'bookmarks.title': 'Your Bookmarks',
        'bookmarks.empty.title': 'No Bookmarks Yet',
        'bookmarks.empty.description': 'Bookmark verses as you read to see them here',
        'bookmarks.goToVerse': 'Go to Verse',
        'bookmarks.bookmarkedOn': 'Bookmarked on',

        // Languages
        'lang.english': 'English',
        'lang.hindi': 'हिंदी',
        'lang.sanskrit': 'संस्कृतम्',
        'lang.select': 'Select Language',
      },
      hi: {
        // Navigation
        'nav.home': 'होम',
        'nav.read': 'पढ़ना शुरू करें',
        'nav.features': 'सुविधाएं',
        'nav.about': 'हमारे बारे में',
        'nav.contact': 'संपर्क',
        'nav.settings': 'सेटिंग्स',

        // Header
        'header.title': 'भगवद गीता',
        'header.subtitle': 'दिव्य ज्ञान',
        'header.quickJump': 'त्वरित कूद',

        // Homepage
        'home.hero.title': 'दिव्य ज्ञान की खोज करें',
        'home.hero.subtitle': 'भगवद गीता',
        'home.hero.description': 'अध्याय दर अध्याय भगवद गीता को पढ़ें, सुनें और अन्वेषण करें। हमारा इंटरैक्टिव UI बहु-भाषा अनुवाद, उच्च-गुणवत्ता वाले टेक्स्ट-टू-वॉइस पाठ, बुकमार्क और प्रगति ट्रैकिंग का समर्थन करता है।',
        'home.hero.startReading': 'पढ़ना शुरू करें',
        'home.hero.learnMore': 'और जानें',

        // Features
        'features.title': 'दिव्य ज्ञान की खोज करें',
        'features.subtitle': 'हमारे व्यापक रीडिंग प्लेटफॉर्म के साथ भगवद गीता का अनुभव पहले कभी न देखा गया',
        'features.completeText.title': 'पूर्ण पाठ',
        'features.completeText.description': 'सुंदर फ़ॉर्मेटिंग और स्पष्ट टाइपोग्राफी के साथ भगवद गीता के सभी 18 अध्याय और 700 श्लोकों तक पहुंच प्राप्त करें।',
        'features.smartSearch.title': 'स्मार्ट खोज',
        'features.smartSearch.description': 'हमारी शक्तिशाली खोज कार्यक्षमता के साथ विशिष्ट श्लोक, अध्याय या अवधारणाएं तुरंत खोजें जो अंग्रेजी और संस्कृत दोनों पाठों में काम करती है।',
        'features.bookmarks.title': 'बुकमार्क',
        'features.bookmarks.description': 'अपने पसंदीदा श्लोकों को सहेजें और व्यक्तिगत संग्रह बनाएं। उन मार्गों को कभी न खोएं जो आपकी आत्मा से प्रतिध्वनित होते हैं।',
        'features.progress.title': 'प्रगति ट्रैकिंग',
        'features.progress.description': 'विस्तृत प्रगति संकेतकों के साथ अपनी पढ़ने की यात्रा की निगरानी करें। देखें कि आपने प्रत्येक अध्याय का कितना पूरा किया है और प्रेरित रहें।',
        'features.audio.title': 'ऑडियो पाठ',
        'features.audio.description': 'पढ़ते समय दिव्य पाठ सुनें। पारंपरिक गायन और आधुनिक ऑडियो गुणवत्ता के माध्यम से पवित्र श्लोकों का अनुभव करें।',
        'features.multilang.title': 'बहु-भाषा',
        'features.multilang.description': 'संस्कृत, अंग्रेजी और अन्य क्षेत्रीय अनुवाद सहित गहरी समझ के लिए कई भाषाओं में गीता का अन्वेषण करें।',

        // CTA
        'cta.title': 'अपनी आध्यात्मिक यात्रा शुरू करें',
        'cta.description': 'हजारों साधकों में शामिल हों जिन्होंने भगवद गीता की शिक्षाओं के माध्यम से ज्ञान, शांति और ज्ञान प्राप्त किया है।',
        'cta.button': 'अपनी यात्रा शुरू करें',

        // Reader
        'reader.title': 'पाठक',
        'reader.selectChapter': 'पढ़ना शुरू करने के लिए साइडबार से एक अध्याय चुनें।',
        'reader.chapters': 'अध्याय',
        'reader.gita': 'भगवद गीता',

        // Search
        'search.placeholder': 'अध्याय या संस्कृत शीर्षक खोजें...',
        'search.button': 'खोज',

        // Bookmarks
        'bookmarks.title': 'आपके बुकमार्क',
        'bookmarks.empty.title': 'अभी तक कोई बुकमार्क नहीं',
        'bookmarks.empty.description': 'यहां देखने के लिए पढ़ते समय श्लोक बुकमार्क करें',
        'bookmarks.goToVerse': 'श्लोक पर जाएं',
        'bookmarks.bookmarkedOn': 'बुकमार्क किया गया',

        // Languages
        'lang.english': 'English',
        'lang.hindi': 'हिंदी',
        'lang.sanskrit': 'संस्कृतम्',
        'lang.select': 'भाषा चुनें',
      },
      sa: {
        // Navigation
        'nav.home': 'गृहम्',
        'nav.read': 'पठनम् आरभताम्',
        'nav.features': 'विशेषताः',
        'nav.about': 'अस्माकम् विषये',
        'nav.contact': 'संपर्कः',
        'nav.settings': 'स्थापनाः',

        // Header
        'header.title': 'भगवद्गीता',
        'header.subtitle': 'दिव्यं ज्ञानम्',
        'header.quickJump': 'द्रुतं कूर्दनम्',

        // Homepage
        'home.hero.title': 'दिव्यं ज्ञानम् अन्विष्यताम्',
        'home.hero.subtitle': 'भगवद्गीता',
        'home.hero.description': 'अध्यायेन अध्यायेन भगवद्गीतां पठत, शृणुत, अन्विष्यत च। अस्माकम् अन्तरक्रियात्मकं UI बहुभाषानुवादान्, उच्चगुणवत्तायुक्तान् वाक्पाठान्, पुस्तकचिह्नानि, प्रगतिसूचनां च समर्थयते।',
        'home.hero.startReading': 'पठनम् आरभताम्',
        'home.hero.learnMore': 'अधिकं ज्ञातव्यम्',

        // Features
        'features.title': 'दिव्यं ज्ञानम् अन्विष्यताम्',
        'features.subtitle': 'अस्माकं व्यापके पठनप्लेटफार्मेण भगवद्गीताया अनुभवः पूर्वं कदापि न दृष्टः',
        'features.completeText.title': 'पूर्णपाठः',
        'features.completeText.description': 'सुन्दरसंरचनया स्पष्टटंकनकलया च भगवद्गीतायाः सर्वेषु १८ अध्यायेषु ७०० श्लोकेषु च प्रवेशं प्राप्नुत।',
        'features.smartSearch.title': 'प्राज्ञान्वेषणम्',
        'features.smartSearch.description': 'अस्माकया शक्तिशालिन्या अन्वेषणक्रियया विशिष्टान् श्लोकान्, अध्यायान्, अवधारणाः वा तत्क्षणमेव अन्विष्यत यत् आङ्ग्लभाषायां संस्कृतभाषायां च कार्यं करोति।',
        'features.bookmarks.title': 'पुस्तकचिह्नानि',
        'features.bookmarks.description': 'स्वप्रियश्लोकान् रक्षत, वैयक्तिकसंग्रहान् निर्मात च। तान् मार्गान् कदापि मा हारयत यत् भवत आत्मना प्रतिध्वनितम्।',
        'features.progress.title': 'प्रगतिसूचनम्',
        'features.progress.description': 'विस्तृतप्रगतिसूचकैः सह भवतः पठनयात्राया निरीक्षणं कुर्वन्तु। पश्यत यत् भवता प्रत्येकस्मिन्नध्याये कियत् समाप्तम् प्रेरितश्च भवत।',
        'features.audio.title': 'श्रव्यपाठः',
        'features.audio.description': 'पठतः दिव्यान् पाठान् शृणुत। पारम्परिकगायनेन आधुनिकश्रव्यगुणवत्तया च पवित्रश्लोकानाम् अनुभवं प्राप्नुत।',
        'features.multilang.title': 'बहुभाषा',
        'features.multilang.description': 'संस्कृतभाषायां, आङ्ग्लभाषायां, अन्येषु च क्षेत्रीयानुवादेषु गहनबोधनार्थं गीताया अन्वेषणं कुर्वन्तु।',

        // CTA
        'cta.title': 'स्वाध्यात्मिकयात्रा आरभताम्',
        'cta.description': 'सहस्रेषु साधकेषु सम्मिलिताः भवन्तु ये भगवद्गीताया उपदेशैः ज्ञानम्, शान्तिं, ज्ञानं च प्राप्तवन्तः।',
        'cta.button': 'स्वयात्रा आरभताम्',

        // Reader
        'reader.title': 'पाठकः',
        'reader.selectChapter': 'पठनम् आरभितुं पार्श्वपट्टिकायाः अध्यायं चिनुत।',
        'reader.chapters': 'अध्यायाः',
        'reader.gita': 'भगवद्गीता',

        // Search
        'search.placeholder': 'अध्यायान् संस्कृतशीर्षकान् वा अन्विष्यताम्...',
        'search.button': 'अन्वेषणम्',

        // Bookmarks
        'bookmarks.title': 'भवतः पुस्तकचिह्नानि',
        'bookmarks.empty.title': 'अद्यापि पुस्तकचिह्नानि न सन्ति',
        'bookmarks.empty.description': 'पठतः श्लोकान् पुस्तकचिह्नयित्वा अत्र द्रष्टुम्',
        'bookmarks.goToVerse': 'श्लोकं गच्छत',
        'bookmarks.bookmarkedOn': 'पुस्तकचिह्नितम्',

        // Languages
        'lang.english': 'English',
        'lang.hindi': 'हिंदी',
        'lang.sanskrit': 'संस्कृतम्',
        'lang.select': 'भाषां चिनुत',
      }
    };

    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};