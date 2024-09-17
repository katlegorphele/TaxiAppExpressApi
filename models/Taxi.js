const mongoose = require('mongoose');
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

module.exports = mongoose.model("Taxi",taxiSchema);
