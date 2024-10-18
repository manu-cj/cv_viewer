import {Schema, model, models} from 'mongoose'

const downloadSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    collection: 'Download',
    timestamps: true
});


const Download = models.Download || model('Download', downloadSchema);

export default Download;