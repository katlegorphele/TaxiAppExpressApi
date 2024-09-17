const mongoose = require ("mongoose");
const {Schema} = mongoose;

const taxiBossSchema = new Schema({
    name: {type: String, required: true},
    walletAddress: {type: String, required: true},
    fleet: [{type: Schema.Types.ObjectId, ref: 'Taxi'}]
});

module.exports = mongoose.model("TaxiBoss",taxiBossSchema);
