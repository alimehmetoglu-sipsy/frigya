import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'site-data.json');

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading data:', error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Read existing data
    let existingData = {};
    try {
      const data = await fs.readFile(dataFilePath, 'utf-8');
      existingData = JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet, use empty object
    }
    
    // Merge with new data
    const updatedData = { ...existingData, ...body };
    
    // Write updated data
    await fs.writeFile(dataFilePath, JSON.stringify(updatedData, null, 2));
    
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { section, data } = await request.json();
    
    // Read existing data
    const fileData = await fs.readFile(dataFilePath, 'utf-8');
    const existingData = JSON.parse(fileData);
    
    // Update specific section
    existingData[section] = data;
    
    // Write updated data
    await fs.writeFile(dataFilePath, JSON.stringify(existingData, null, 2));
    
    return NextResponse.json({ success: true, data: existingData });
  } catch (error) {
    console.error('Error updating data:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}