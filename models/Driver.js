const mongoose = require('mongoose');
const {Schema} = mongoose;

const driverSchema = new Schema({
    name:{type: String, required: true},
    taxiId: {type: Schema.Types.ObjectId, ref: 'Taxi', required: true},
    phoneNumber: {type: String, required: true}
});

module.exports = mongoose.model("Driver", driverSchema);
