import dbConnect from "./mongoose";
import Download from "@/app/models/Download"
import FileModel from "../models/FileModel";


export const addDownloadStat = async (filename: string) => {
    await dbConnect();
    const fileRecord = await FileModel.findOne({ filename });

    if (!fileRecord) {
        throw new Error(`File with filename ${filename} not found`);
    }

    const userId = fileRecord.userId;

    const newDownloadStat = new Download({filename, userId});
    await newDownloadStat.save();

    return newDownloadStat;
};

export async function getDownloadStat(userId: string) {
    try {
        const filesDownload = await Download.find({
            userId: userId,
        }).sort({ createdAt: -1 }); ;

        return filesDownload;
    } catch (error) {
        console.error('Erreur lors de la récupération des télèchargements:', error);
        throw new Error('Erreur lors de la récupération des statistiques de téléchargement');
    }
}