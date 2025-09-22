# Bhagavad Gita Translation API

This folder contains a translation service using LibreTranslate API for multilingual support in the Bhagavad Gita app. This approach uses a free, cloud-based translation service instead of local models to save disk space.

## Features

- **Space Efficient**: No large model downloads required
- **200+ Languages**: Support for extensive language coverage
- **Fast Translation**: Cloud-based processing
- **Free**: Uses LibreTranslate's free API

## Setup

1. Activate the virtual environment:
   ```bash
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Service

Start the FastAPI server:
```bash
python translate_service.py
```

The service will run on `http://localhost:8000`.

## API Usage

### POST /translate

Translate text between languages.

**Request Body:**
```json
{
  "text": "Hello world",
  "source": "en",
  "target": "hi"
}
```

**Response:**
```json
{
  "translated": "नमस्ते दुनिया"
}
```

## Supported Languages

- `en`: English
- `hi`: Hindi
- `sa`: Sanskrit
- `es`: Spanish
- `ar`: Arabic
- `fr`: French
- `de`: German
- `zh`: Chinese
- `ja`: Japanese
- `ru`: Russian

Add more languages by updating the `lang_codes` dictionary in `translate_nllb.py`.

## Integration with Next.js App

The service integrates with the Next.js app via `lib/translationService.ts`.