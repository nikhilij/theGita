import axios from 'axios';

const TRANSLATE_URL = process.env.NEXT_PUBLIC_TRANSLATE_URL || 'https://improved-dollop-74q9vj457v92pp9j-8000.app.github.dev/translate';
const BATCH_TRANSLATE_URL = process.env.NEXT_PUBLIC_TRANSLATE_URL?.replace('/translate', '/translate-batch') || 'https://improved-dollop-74q9vj457v92pp9j-8000.app.github.dev/translate-batch';

// Cache for translations to avoid repeated API calls
const translationCache = new Map<string, string>();

/**
 * TODO: Translation Enhancement Plan
 * 
 * Current Issues:
 * - Translations are hard to read and understand
 * - Context is often lost in translation
 * - UI sometimes doesn't display translations properly
 * 
 * Proposed Solutions:
 * 1. Implement context-aware translations
 * 2. Consider vector embeddings similar to RAG systems
 * 3. Add domain-specific context hints
 * 4. Improve UI rendering of translations
 * 
 * See /translateapi/TRANSLATION_TODO.md for complete details
 */

// Domain-specific context for better translations
const translationContexts: Record<string, string> = {
  'home.hero': 'Spiritual wisdom from the Bhagavad Gita, Hindu sacred text',
  'features': 'Features of a Bhagavad Gita reading application',
  'chapter': 'Chapter titles from the Bhagavad Gita',
  'cta': 'Call to action for users to read the Bhagavad Gita',
  'footer': 'Website footer information'
};

// Generate cache key
const getCacheKey = (text: string, sourceLang: string, targetLang: string, context?: string): string => {
  return `${text}|${sourceLang}|${targetLang}|${context || ''}`;
};

/**
 * Enhanced translation function with context support
 * @param text Text to translate
 * @param targetLang Target language code
 * @param sourceLang Source language code
 * @param contextKey Optional context key for domain-specific translations
 * @returns Translated text
 */
export const translateWithHuggingFace = async (
  text: string, 
  targetLang: string, 
  sourceLang = 'en', 
  contextKey?: string
): Promise<string> => {
  // Extract context from contextKey if provided
  const context = contextKey ? 
    Object.entries(translationContexts).find(([key]) => contextKey.startsWith(key))?.[1] : 
    undefined;
  
  // Check cache first with context
  const cacheKey = getCacheKey(text, sourceLang, targetLang, context);
  if (translationCache.has(cacheKey)) {
    console.log('Cache hit for:', text.substring(0, 30) + '...');
    return translationCache.get(cacheKey)!;
  }

  try {
    console.log('Translating:', { 
      text: text.substring(0, 50) + '...', 
      sourceLang, 
      targetLang,
      context: context || 'none'
    });
    
    // Add context to improve translation quality if available
    const payload: any = {
      text,
      source: sourceLang,
      target: targetLang
    };
    
    if (context) {
      payload.context = context;
    }
    
    const response = await axios.post(TRANSLATE_URL, payload);
    let translated = response.data.translated;
    
    // Post-processing for better readability
    // Remove excessive punctuation that sometimes appears in translations
    translated = translated.replace(/([,.!?])\1+/g, '$1');
    
    // Fix capitalization
    if (translated.length > 0) {
      translated = translated.charAt(0).toUpperCase() + translated.slice(1);
    }
    
    // Cache the result
    translationCache.set(cacheKey, translated);
    
    return translated;
  } catch (error) {
    console.error('Translation error:', error);
    return text;  // Fallback
  }
};

/**
 * Enhanced batch translation function with context support
 * @param texts Array of texts to translate
 * @param targetLang Target language code
 * @param sourceLang Source language code
 * @param contextKeys Optional array of context keys for domain-specific translations
 * @returns Array of translated texts
 */
export const translateBatch = async (
  texts: string[], 
  targetLang: string, 
  sourceLang = 'en',
  contextKeys?: string[]
): Promise<string[]> => {
  // Check cache for all texts first
  const results: string[] = [];
  const uncachedTexts: string[] = [];
  const uncachedIndices: number[] = [];
  const uncachedContexts: string[] = [];

  for (let i = 0; i < texts.length; i++) {
    const contextKey = contextKeys?.[i];
    const context = contextKey ? 
      Object.entries(translationContexts).find(([key]) => contextKey.startsWith(key))?.[1] : 
      undefined;
    
    const cacheKey = getCacheKey(texts[i], sourceLang, targetLang, context);
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