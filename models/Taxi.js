import mongoose, { model } from 'mongoose';
const {Schema} = mongoose;

const taxiSchema = new Schema ({
    taxiBossId:{
        type: Schema.Types.ObjectId,
        ref: 'TaxiBoss',
        required: true
    },
    driverId:{type: Schema.Types.ObjectId, ref: 'Driver'},
    routeId: {type: Schema.Types.ObjectId, ref:'Route'}
});

export default model("Taxi",taxiSchema);
