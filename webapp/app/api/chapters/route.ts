import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import { Chapter } from '../../../models/Gita';

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const chapters = await Chapter.find({}).select('-verses').sort('chapter_number');
    return NextResponse.json({ success: true, data: chapters });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
