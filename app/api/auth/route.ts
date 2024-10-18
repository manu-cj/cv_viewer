// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import User from '@/app/models/user'; 
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; // Pour générer un token
import dbConnect from '@/app/lib/mongoose';

export async function POST(req: Request) {
await dbConnect();
  const { email, password } = await req.json();
  
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Mot de passe invalide' }, { status: 401 });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });

  const response = NextResponse.json({ message: 'Connexion réussie !' });
  response.cookies.set('token', token, { httpOnly: true }); // Cookie HttpOnly pour plus de sécurité

  return response;
}
