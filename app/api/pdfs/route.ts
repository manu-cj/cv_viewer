import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const directoryPath = path.join(process.cwd(), 'public', 'uploads');

  try {
    const files = await fs.promises.readdir(directoryPath);
    const pdfFiles = files.filter(file => file.endsWith('.pdf')); 
    return NextResponse.json(pdfFiles);
  } catch (err) {
    console.error('Une erreur s\'est produite:', err); 
    return NextResponse.error();
  }
}
