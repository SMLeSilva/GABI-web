import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type'); // 'servicos' or 'galeria'

  if (!type) {
    return NextResponse.json({ error: 'Missing type' }, { status: 400 });
  }

  const filePath = path.join(CONTENT_DIR, `${type}.json`);
  
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  return NextResponse.json(JSON.parse(fileContents));
}

export async function POST(request: Request) {
  const body = await request.json();
  const { type, data } = body;

  if (!type || !data) {
    return NextResponse.json({ error: 'Missing type or data' }, { status: 400 });
  }

  const filePath = path.join(CONTENT_DIR, `${type}.json`);
  
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to write file' }, { status: 500 });
  }
}
