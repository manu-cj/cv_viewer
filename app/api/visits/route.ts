import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { recordVisits } from "@/app/lib/recordVisits";
import { getVisits } from "@/app/lib/recordVisits";
import FileModel from "@/app/models/FileModel";



export async function POST(req: Request) {
    const { filename, duration } = await req.json();

    try {
        const newVisit = await recordVisits(filename, duration);
        return NextResponse.json({ message: 'visite ajouté avec succès', visit: newVisit}, { status: 201})
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}


export async function GET(req: Request) {
    try {
        //@ts-expect-error le code fonctionne
        const tokenCookie = req.cookies.get('token');
        
        if (!tokenCookie || typeof tokenCookie.value !== 'string') {
            return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
        }

        const verified = jwt.verify(tokenCookie.value, process.env.JWT_SECRET);

        const userId = verified.id;

        const fileData = await FileModel.find({ userId });

        const visits = await getVisits(userId);

        return NextResponse.json({ visits: visits, file: fileData}, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}

