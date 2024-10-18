import dbConnect from './mongoose'; // Chemin vers ta fonction de connexion
import User from '@/app/models/user'; // Chemin vers ton modèle
import bcrypt from 'bcrypt'


export const addUser = async (username: string, email: string, password: string) => {
    await dbConnect();
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
  
    return newUser;
  };