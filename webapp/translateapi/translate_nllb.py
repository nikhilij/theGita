import requests
import json
import asyncio
import aiohttp
from concurrent.futures import ThreadPoolExecutor
import hashlib
import time
from functools import lru_cache

# Using MyMemory Translation API (free and reliable)
MYMEMORY_URL = "https://api.mymemory.translated.net/get"

# Language codes mapping (MyMemory uses ISO codes)
lang_codes = {
    "en": "en",  # English
    "hi": "hi",  # Hindi
    "sa": "sa",  # Sanskrit
    "es": "es",  # Spanish
    "ar": "ar",  # Arabic
    "fr": "fr",  # French
    "de": "de",  # German
    "zh": "zh-CN",  # Chinese (Simplified)
    "ja": "ja",  # Japanese
    "ru": "ru",  # Russian
    # Add more languages as needed
}

# Simple in-memory cache with TTL
translation_cache = {}
CACHE_TTL = 3600  # 1 hour

def get_cache_key(text, source_lang, target_lang):
    """Generate a cache key for translation"""
    content = f"{text}|{source_lang}|{target_lang}"
    return hashlib.md5(content.encode()).hexdigest()

def is_cache_valid(timestamp):
    """Check if cache entry is still valid"""
    return time.time() - timestamp < CACHE_TTL

async def translate_text_async(text, source_lang="en", target_lang="hi"):
    """
    Async translation using aiohttp for better performance
    """
    # Check cache first
    cache_key = get_cache_key(text, source_lang, target_lang)
    if cache_key in translation_cache:
        cached_result, timestamp = translation_cache[cache_key]
        if is_cache_valid(timestamp):
            print(f"Cache hit for: {text[:30]}...")
            return cached_result

    try:
        params = {
            "q": text,
            "langpair": f"{lang_codes.get(source_lang, 'en')}|{lang_codes.get(target_lang, 'hi')}",
            "de": "thegita-app@example.com"  # Optional: helps with rate limits
        }

        async with aiohttp.ClientSession() as session:
            async with session.get(MYMEMORY_URL, params=params, timeout=aiohttp.ClientTimeout(total=10)) as response:
                result = await response.json()
                translated_text = result.get("responseData", {}).get("translatedText", text)

                # Cache the result
                translation_cache[cache_key] = (translated_text, time.time())
                
                # MyMemory sometimes returns the original text if translation fails
                if translated_text == text and source_lang != target_lang:
                    print(f"Warning: Translation may not be available for {source_lang} to {target_lang}")

                return translated_text

    except Exception as e:
        print(f"Translation error: {e}")
        return text  # Return original text if translation fails

def translate_text(text, source_lang="en", target_lang="hi"):
    """
    Synchronous wrapper for async translation
    """
    try:
        loop = asyncio.get_event_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
    
    return loop.run_until_complete(translate_text_async(text, source_lang, target_lang))

async def translate_batch_async(texts, source_lang="en", target_lang="hi"):
    """
    Translate multiple texts concurrently for better performance
    """
    tasks = []
    for text in texts:
        task = translate_text_async(text, source_lang, target_lang)
        tasks.append(task)
    
    # Run all translations concurrently
    results = await asyncio.gather(*tasks, return_exceptions=True)
    
    # Handle any exceptions
    translated_texts = []
    for i, result in enumerate(results):
        if isinstance(result, Exception):
            print(f"Error translating text {i}: {result}")
            translated_texts.append(texts[i])  # Return original text on error
        else:
            translated_texts.append(result)
    
    return translated_texts

def translate_batch(texts, source_lang="en", target_lang="hi"):
    """
    Synchronous wrapper for batch translation
    """
    try:
        loop = asyncio.get_event_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
    
    return loop.run_until_complete(translate_batch_async(texts, source_lang, target_lang))

if __name__ == "__main__":
    # Example usage
    result = translate_text("Om Shanti", "sa", "en")
    print(result)  # Output: Something like "Om Peace"