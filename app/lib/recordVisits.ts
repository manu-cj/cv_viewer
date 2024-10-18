import dbConnect from "./mongoose";
import Visit from "../models/Visit";
import FileModel from "../models/FileModel";


export const recordVisits = async (filename: string, duration: number) => {
    await dbConnect();
    const fileRecord = await FileModel.findOne({ filename });

    if (!fileRecord) {
        throw new Error(`File with filename ${filename} not found`);
    }

    const userId = fileRecord.userId;

    const newVisit = new Visit({userId, filename, duration});
    await newVisit.save();

    return newVisit;
}

export async function getVisits(userId: string) {
    try {
        const visits = await Visit.find({
            userId: userId,
        }).sort({ createdAt: -1 }); ;

        return visits;
    } catch (error) {
        console.error('Erreur lors de la récupération des visites:', error);
        throw new Error('Erreur lors de la récupération des visites');
    }
}