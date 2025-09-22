import axios from 'axios';

const TRANSLATE_URL = process.env.NEXT_PUBLIC_TRANSLATE_URL || 'https://improved-dollop-74q9vj457v92pp9j-8000.app.github.dev/translate';
const BATCH_TRANSLATE_URL = process.env.NEXT_PUBLIC_TRANSLATE_URL?.replace('/translate', '/translate-batch') || 'https://improved-dollop-74q9vj457v92pp9j-8000.app.github.dev/translate-batch';

// Cache for translations to avoid repeated API calls
const translationCache = new Map<string, string>();

// Generate cache key
const getCacheKey = (text: string, sourceLang: string, targetLang: string): string => {
  return `${text}|${sourceLang}|${targetLang}`;
};

export const translateWithHuggingFace = async (text: string, targetLang: string, sourceLang = 'en'): Promise<string> => {
  // Check cache first
  const cacheKey = getCacheKey(text, sourceLang, targetLang);
  if (translationCache.has(cacheKey)) {
    console.log('Cache hit for:', text.substring(0, 30) + '...');
    return translationCache.get(cacheKey)!;
  }

  try {
    console.log('Translating:', { text: text.substring(0, 50) + '...', sourceLang, targetLang });
    
    const response = await axios.post(TRANSLATE_URL, {
      text,
      source: sourceLang,
      target: targetLang
    });
    
    const translated = response.data.translated;
    
    // Cache the result
    translationCache.set(cacheKey, translated);
    
    return translated;
  } catch (error) {
    console.error('Translation error:', error);
    return text;  // Fallback
  }
};

export const translateBatch = async (texts: string[], targetLang: string, sourceLang = 'en'): Promise<string[]> => {
  // Check cache for all texts first
  const results: string[] = [];
  const uncachedTexts: string[] = [];
  const uncachedIndices: number[] = [];

  for (let i = 0; i < texts.length; i++) {
    const cacheKey = getCacheKey(texts[i], sourceLang, targetLang);
    if (translationCache.has(cacheKey)) {
      results[i] = translationCache.get(cacheKey)!;
    } else {
      uncachedTexts.push(texts[i]);
      uncachedIndices.push(i);
    }
  }

  // If all texts are cached, return immediately
  if (uncachedTexts.length === 0) {
    console.log('All texts found in cache');
    return results;
  }

  try {
    console.log(`Batch translating ${uncachedTexts.length} texts to ${targetLang}`);
    
    const response = await axios.post(BATCH_TRANSLATE_URL, {
      texts: uncachedTexts,
      source: sourceLang,
      target: targetLang
    });
    
    const translations = response.data.translations;
    
    // Fill in the results and cache new translations
    for (let i = 0; i < uncachedIndices.length; i++) {
      const originalIndex = uncachedIndices[i];
      const translated = translations[i].translated;
      results[originalIndex] = translated;
      
      // Cache the result
      const cacheKey = getCacheKey(uncachedTexts[i], sourceLang, targetLang);
      translationCache.set(cacheKey, translated);
    }
    
    return results;
  } catch (error) {
    console.error('Batch translation error:', error);
    
    // Fallback: fill remaining results with original texts
    for (const index of uncachedIndices) {
      results[index] = texts[index];
    }
    
    return results;
  }
};

// Utility function to get cache statistics
export const getCacheStats = () => {
  return {
    size: translationCache.size,
    keys: Array.from(translationCache.keys()).slice(0, 10)
  };
};