import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'content.json');

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const updatedImage = await request.json();
    const data = await fs.readFile(dataFile, 'utf-8');
    const content = JSON.parse(data);
    
    const index = content.gallery.findIndex((img: any) => img.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Görsel bulunamadı' }, { status: 404 });
    }
    
    content.gallery[index] = { ...content.gallery[index], ...updatedImage };
    await fs.writeFile(dataFile, JSON.stringify(content, null, 2));
    
    return NextResponse.json(content.gallery[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Görsel güncellenemedi' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const data = await fs.readFile(dataFile, 'utf-8');
    const content = JSON.parse(data);
    
    content.gallery = content.gallery.filter((img: any) => img.id !== id);
    await fs.writeFile(dataFile, JSON.stringify(content, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Görsel silinemedi' }, { status: 500 });
  }
}