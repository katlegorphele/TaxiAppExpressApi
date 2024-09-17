import mongoose, { model } from 'mongoose';
const {Schema} = mongoose;

const driverSchema = new Schema({
    walletAddress: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    taxi: { type: mongoose.Schema.Types.ObjectId, ref: 'Taxi' }
});

export default model("Driver", driverSchema);
