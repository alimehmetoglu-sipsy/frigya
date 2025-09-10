import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'content.json');

export async function GET() {
  try {
    const data = await fs.readFile(dataFile, 'utf-8');
    const content = JSON.parse(data);
    return NextResponse.json(content.gallery);
  } catch (error) {
    return NextResponse.json({ error: 'Veri okunamadı' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newImage = await request.json();
    const data = await fs.readFile(dataFile, 'utf-8');
    const content = JSON.parse(data);
    
    // Yeni ID oluştur
    const newId = content.gallery.length > 0 
      ? Math.max(...content.gallery.map((img: any) => img.id)) + 1 
      : 1;
    
    newImage.id = newId;
    content.gallery.push(newImage);
    
    await fs.writeFile(dataFile, JSON.stringify(content, null, 2));
    
    return NextResponse.json(newImage);
  } catch (error) {
    return NextResponse.json({ error: 'Görsel eklenemedi' }, { status: 500 });
  }
}