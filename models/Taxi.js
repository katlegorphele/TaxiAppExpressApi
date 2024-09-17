import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const taxiSchema = new Schema({
    licensePlate: {
        type: String,
        required: true,
        unique: true
    },
    taxiOwnerId: {
        type: Schema.Types.ObjectId,
        ref: 'TaxiOwner',
        required: true
    },
    driverId: {
        type: Schema.Types.ObjectId,
        ref: 'Driver'
    },
    routeId: {
        type: Schema.Types.ObjectId,
        ref: 'Route'
    },
    type: {
        type: String,
        required: true
    },
    numberOfSeats: {
        type: Number,
        required: true
    }
});

export default model("Taxi", taxiSchema);
