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

export async function GET(request: NextRequest) {
  try {
    await ensurePagesFile();
    const data = await fs.readFile(pagesFilePath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading pages:', error);
    return NextResponse.json({ pages: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensurePagesFile();
    const body = await request.json();
    
    const newPage = {
      id: Date.now().toString(),
      title: body.title,
      slug: body.slug,
      template: body.template || 'blank',
      components: body.components || [],
      published: body.published || false,
      seo: body.seo || {
        title: body.title,
        description: '',
        keywords: ''
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const data = await fs.readFile(pagesFilePath, 'utf-8');
    const pagesData = JSON.parse(data);
    pagesData.pages.push(newPage);
    
    await fs.writeFile(pagesFilePath, JSON.stringify(pagesData, null, 2));
    
    return NextResponse.json(newPage);
  } catch (error) {
    console.error('Error creating page:', error);
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}