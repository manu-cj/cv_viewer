import { Schema, model, models } from 'mongoose';

const fileSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  ext: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
}, { 
  collection: 'Uploads',
  timestamps: true 
});

const FileModel = models.File || model('File', fileSchema);

export default FileModel;
