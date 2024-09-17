const mongoose = require("mongoose");
const {Schema} = mongoose;

const passengerSchema = new Schema({
    walletAddress: {type: String, required: true, unique: true},
    name:{type: String, required: true},
    email: {type: String, required: true, unique: true}

});

module.exports = mongoose.model("Passenger",passengerSchema);
