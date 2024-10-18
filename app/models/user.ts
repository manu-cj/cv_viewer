import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
    username: {
      type: String,
      required: [true, "Le nom d'utilisateur est requis"],
      trim: true,
      minlength: [3, "Le nom d'utilisateur doit avoir au moins 3 caractères"],
      maxlength: [30, "Le nom d'utilisateur ne doit pas dépasser 30 caractères"]
    },
    email: {
      type: String,
      required: [true, "L'adresse email est requise"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Veuillez entrer une adresse email valide']
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est requis'],
      minlength: [8, 'Le mot de passe doit comporter au moins 8 caractères']
    },
    role: {
      type: Number,
      enum: [1, 2, 3], 
      default: 2,
      required: true
    }
  }, { 
    collection: 'Users',
    timestamps: true 
  });

const User = models.User || model('User', userSchema)

export default User
