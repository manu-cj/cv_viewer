// app/api/addUser/route.ts
import { NextResponse } from 'next/server';
import { addUser } from '@/app/lib/user';

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  try {
    const newUser = await addUser(username, email, password);
    return NextResponse.json({ message: 'Utilisateur ajouté avec succès', user: newUser }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
