import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import FileModel from '@/app/models/FileModel'; 
import { JwtPayload } from 'jsonwebtoken'; 
import dbConnect from '@/app/lib/mongoose'; 

export async function GET(req: Request) {
  try {
    await dbConnect();
    //@ts-expect-error le code fonctionne
    const tokenCookie = req.cookies.get('token');

    if (!tokenCookie || typeof tokenCookie.value !== 'string') {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const verified = jwt.verify(tokenCookie.value, process.env.JWT_SECRET as string) as JwtPayload;

    if (!verified || !verified.id) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }

    const userId = verified.id;

    const files = await FileModel.find({ userId: userId });

    return NextResponse.json({ files }, { status: 200 });

  } catch (error) {
    console.error('Erreur lors de la récupération des fichiers:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des fichiers' }, { status: 500 });
  }
}
