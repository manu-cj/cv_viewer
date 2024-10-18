import dbConnect from "./mongoose";
import Print from "@/app/models/Print"
import FileModel from "../models/FileModel";


export const addPrintStat = async (filename: string) => {
    await dbConnect();
    const fileRecord = await FileModel.findOne({ filename });

    if (!fileRecord) {
        throw new Error(`File with filename ${filename} not found`);
    }

    const userId = fileRecord.userId;

    const newPrintStat = new Print({ filename, userId });
    await newPrintStat.save();
    return newPrintStat;
}

export async function getPrintStat(userId: string) {
    try {
        const filesPrint = await Print.find({
            userId: userId,
        }).sort({ createdAt: -1 }); ;

        return filesPrint;
    } catch (error) {
        console.error('Erreur lors de la récupération des impressions:', error);
        throw new Error('Erreur lors de la récupération des statistiques d\'impression.');
    }
}