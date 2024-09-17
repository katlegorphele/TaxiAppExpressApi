import mongoose, { model } from "mongoose";
const {Schema} = mongoose;

const taxiBossSchema = new Schema({
    name: {type: String, required: true},
    walletAddress: {type: String, required: true},
    fleet: [{type: Schema.Types.ObjectId, ref: 'Taxi'}]
});

export default model("TaxiBoss",taxiBossSchema);
