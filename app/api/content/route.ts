import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'content.json');

export async function GET() {
  try {
    const data = await fs.readFile(dataFile, 'utf-8');
    const content = JSON.parse(data);
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: 'Veri okunamadı' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updates = await request.json();
    const data = await fs.readFile(dataFile, 'utf-8');
    const content = JSON.parse(data);
    
    // İçerikleri güncelle
    if (updates.hero) {
      content.hero = { ...content.hero, ...updates.hero };
    }
    if (updates.intro) {
      content.intro = { ...content.intro, ...updates.intro };
    }
    
    await fs.writeFile(dataFile, JSON.stringify(content, null, 2));
    
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: 'İçerik güncellenemedi' }, { status: 500 });
  }
}