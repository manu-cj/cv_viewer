import {Schema, model, models} from 'mongoose'

const printSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    collection: 'Prints',
    timestamps: true
});


const Print = models.Prints || model('Prints', printSchema);

export default Print;