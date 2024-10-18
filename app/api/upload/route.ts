import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import FileModel from '@/app/models/FileModel'; // Importer le modèle de fichier
import dbConnect from '@/app/lib/mongoose'; // Importer la connexion MongoDB
import jwt from 'jsonwebtoken';

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

export const POST = async (req: Request) => {
  try {
    await dbConnect();
    const contentType = req.headers.get('content-type');

    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Type de contenu non valide.' }, { status: 400 });
    }

        const cookieHeader = req.headers.get('cookie') || '';
        const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
        const token = cookies['token']; // Remplacer par le nom de ton cookie
        if (!token) {
          return NextResponse.json({ error: 'Utilisateur non authentifié.' }, { status: 401 });
        }
    
        const secretKey = process.env.JWT_SECRET || ''; 
        let decoded ;
        try {
          decoded = jwt.verify(token, secretKey);
        } catch (error: unknown) {
            if (error instanceof Error) {
              return NextResponse.json({ error: 'Token invalide.' }, { status: 401 });
            }
            return NextResponse.json({ error: 'Une erreur inconnue est survenue.' }, { status: 500 });
          }
    
        const userId = decoded?.id;
        if (!userId) {
          return NextResponse.json({ error: 'userId manquant dans le token.' }, { status: 400 });
        }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const title = formData.get('title')?.toString();
    


    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier téléchargé.' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Seuls les fichiers PDF sont autorisés.' }, { status: 400 });
    }
    const uniqueId = uuidv4();
    const ext = path.extname(file.name);
    const filename = uniqueId;
    const newFileName = `${uniqueId}${ext}`;
    const filePath = path.join(uploadDir, newFileName);

    const arrayBuffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

      const newFile = new FileModel({
        userId: userId,
        title: title,
        filename: filename,
        ext: ext,
        path: `/uploads/${newFileName}`,
      });
  
      await newFile.save();

    return NextResponse.json({ message: 'Fichier téléchargé avec succès.' });
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'upload.' }, { status: 500 });
  }
};
