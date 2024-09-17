import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const taxiOwnerSchema = new Schema({
    walletAddress: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    taxis: [{ type: mongoose.Schema.Types.ObjectId, ref: "Taxi" }],
    routes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Route" }],
});

export default model("TaxiOwner", taxiOwnerSchema);
