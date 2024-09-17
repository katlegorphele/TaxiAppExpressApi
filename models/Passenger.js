import mongoose, { model } from "mongoose";
const {Schema} = mongoose;

const passengerSchema = new Schema({
    walletAddress: {type: String, required: true, unique: true},
    name:{type: String, required: true},
    email: {type: String, required: true, unique: true},
    phoneNumber: { type: String, required: true },
    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }]

});

export default model("Passenger",passengerSchema);
