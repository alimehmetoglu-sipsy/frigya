import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const pagesFilePath = path.join(process.cwd(), 'data', 'pages.json');

async function ensurePagesFile() {
  try {
    await fs.access(pagesFilePath);
  } catch {
    await fs.writeFile(pagesFilePath, JSON.stringify({ pages: [] }, null, 2));
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await ensurePagesFile();
    const data = await fs.readFile(pagesFilePath, 'utf-8');
    const pagesData = JSON.parse(data);
    const page = pagesData.pages.find((p: any) => p.id === id);
    
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    
    return NextResponse.json(page);
  } catch (error) {
    console.error('Error reading page:', error);
    return NextResponse.json({ error: 'Failed to read page' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    await ensurePagesFile();
    const data = await fs.readFile(pagesFilePath, 'utf-8');
    const pagesData = JSON.parse(data);
    
    const pageIndex = pagesData.pages.findIndex((p: any) => p.id === id);
    if (pageIndex === -1) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    
    pagesData.pages[pageIndex] = {
      ...pagesData.pages[pageIndex],
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    await fs.writeFile(pagesFilePath, JSON.stringify(pagesData, null, 2));
    
    return NextResponse.json(pagesData.pages[pageIndex]);
  } catch (error) {
    console.error('Error updating page:', error);
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await ensurePagesFile();
    const data = await fs.readFile(pagesFilePath, 'utf-8');
    const pagesData = JSON.parse(data);
    
    pagesData.pages = pagesData.pages.filter((p: any) => p.id !== id);
    
    await fs.writeFile(pagesFilePath, JSON.stringify(pagesData, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
  }
}