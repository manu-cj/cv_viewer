import { NextResponse } from "next/server";
import { addDownloadStat, getDownloadStat } from "@/app/lib/downloadStats";
import FileModel from "@/app/models/FileModel";
import jwt from 'jsonwebtoken';


export async function POST(req: Request) {
    const { filename} = await req.json();

    try {
        const newDownload = await addDownloadStat(filename);
        return NextResponse.json({ message: 'Télèchargement ajouté avec succès', download: newDownload}, { status: 201})
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

        const userId: string = verified.id;

        //for get a file name
        const fileData = await FileModel.find({ userId });


        const newDownload = await getDownloadStat(userId);

        return NextResponse.json({ data: newDownload, file: fileData }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}