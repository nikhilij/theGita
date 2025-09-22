import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Chapter } from '@/models/Gita';

export async function GET(req: NextRequest, { params }: { params: Promise<{ chapter_number: string }> }) {
  const { chapter_number } = await params;
  await dbConnect();

  try {
    const chapter = await Chapter.findOne({ chapter_number: parseInt(chapter_number) });
    if (!chapter) {
      return NextResponse.json({ success: false, error: 'Chapter not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: chapter });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
