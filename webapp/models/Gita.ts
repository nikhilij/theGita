import mongoose, { Schema } from 'mongoose';

const VerseSchema = new Schema({
  chapter: { type: Number, required: true },
  verse: { type: Number, required: true },
  sanskrit: { type: String, required: true },
  english: { type: String, required: true },
  hindi: { type: String, required: true },
  explanation: { type: String, required: true },
});

const ChapterSchema = new Schema({
  chapter_number: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  sanskrit_title: { type: String, required: true },
  description: { type: String, required: true },
  verse_count: { type: Number, required: true },
  verses: [VerseSchema],
});

export const Chapter = mongoose.models.Chapter || mongoose.model('Chapter', ChapterSchema);
export const Verse = mongoose.models.Verse || mongoose.model('Verse', VerseSchema);
