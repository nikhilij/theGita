from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from translate_nllb import translate_text, translate_batch_async, translate_text_async
from typing import List
import asyncio

app = FastAPI(title="Bhagavad Gita Translation API", version="2.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/translate")
async def translate_single(data: dict):
    """
    Translate a single text - now using async for better performance
    """
    text = data.get("text", "")
    source = data.get("source", "en")
    target = data.get("target", "hi")
    
    result = await translate_text_async(text, source, target)
    return {"translated": result}

@app.post("/translate-batch")
async def translate_multiple(data: dict):
    """
    Translate multiple texts concurrently for much faster processing
    """
    texts = data.get("texts", [])
    source = data.get("source", "en")
    target = data.get("target", "hi")
    
    if not texts:
        return {"error": "No texts provided"}
    
    # Use concurrent translation for speed
    results = await translate_batch_async(texts, source, target)
    
    return {
        "translations": [
            {"original": texts[i], "translated": results[i]} 
            for i in range(len(texts))
        ],
        "count": len(results)
    }

@app.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy", "service": "translation-api", "version": "2.0.0"}

@app.get("/cache-stats")
async def cache_statistics():
    """
    Get cache statistics for monitoring
    """
    from translate_nllb import translation_cache
    return {
        "cache_size": len(translation_cache),
        "cache_keys": list(translation_cache.keys())[:10]  # Show first 10 keys
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)