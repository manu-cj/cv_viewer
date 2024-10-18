// app/api/check-auth/route.ts

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: Request) {
  //@ts-expect-error le code fonctionne
  const tokenCookie = req.cookies.get('token');

  if (!tokenCookie || typeof tokenCookie.value !== 'string') {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const verified = jwt.verify(tokenCookie.value, process.env.JWT_SECRET);

    return NextResponse.json({ userId: verified.id }, { status: 200 });
  } catch (error) {
      //@ts-expect-error le code fonctionne
    switch (error.name) {
      case 'TokenExpiredError':
        return NextResponse.json({ error: 'Token expiré' }, { status: 401 });
      case 'JsonWebTokenError':
        return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
      default:
        console.error('Erreur de vérification du token:', error);
        return NextResponse.json({ error: 'Erreur lors de la vérification du token' }, { status: 500 });
    }
  }
}
