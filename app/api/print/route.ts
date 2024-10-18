import { NextResponse } from "next/server";
import { addPrintStat, getPrintStat } from "@/app/lib/printStats";
import FileModel from "@/app/models/FileModel";
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    const { filename } = await req.json();

    if (!filename) {
        return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    try {
        const newPrint = await addPrintStat(filename);
        return NextResponse.json({message: 'Impression ajoutée avec succès', print: newPrint}, { status: 201 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Une erreur est survenue lors de l\'ajout de l\'impression' }, { status: 500 });
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

        const userId: string = verified.id;

        //for get a file name
        const fileData = await FileModel.find({ userId });


        const newPrint = await getPrintStat(userId);

        return NextResponse.json({ data: newPrint, file: fileData }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}