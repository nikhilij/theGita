import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Chapter } from '@/models/Gita';

export async function GET(req: NextRequest, { params }: { params: Promise<{ chapter_number: string, verse_number: string }> }) {
  const { chapter_number, verse_number } = await params;
  await dbConnect();

  try {
    const chapter = await Chapter.findOne({ chapter_number: parseInt(chapter_number) });
    if (!chapter) {
      return NextResponse.json({ success: false, error: 'Chapter not found' }, { status: 404 });
    }
    const verse = chapter.verses.find((v: { verse: number; }) => v.verse === parseInt(verse_number));
    if (!verse) {
        return NextResponse.json({ success: false, error: 'Verse not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: verse });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
