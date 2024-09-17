import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const routeSchema = new Schema({
    taxiBossId: { type: Schema.Types.ObjectId, ref: "TaxiBoss", required: true },
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    cost: { type: Number, required: true }
});

export default model('Route', routeSchema);
