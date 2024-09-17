import mongoose, { model } from 'mongoose';
const {Schema} = mongoose;

const driverSchema = new Schema({
    name:{type: String, required: true},
    taxiId: {type: Schema.Types.ObjectId, ref: 'Taxi', required: true},
    phoneNumber: {type: String, required: true}
});

export default model("Driver", driverSchema);
