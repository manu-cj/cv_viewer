import { Schema, model, models} from 'mongoose';

const VisitSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true 
    },
    duration: {
        type: Number,
        required: true 
    },
   
}, {
    collection: 'Visits',
    timestamps: true
});

const Visit = models.Visit || model('Visit', VisitSchema);

export default Visit