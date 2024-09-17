const mongoose = require('mongoose');
const {Schema} = mongoose;

const tripSchema = new mongoose.Schema({
	passengerId: {type: Schema.Types.ObjectId, ref:'Passenger', required: true},
	taxiId: {type: Schema.Types.ObjectId, ref: 'Taxi', required: true},
	route: {type: Schema.Types.ObjectId, ref:'Route', required: true},
	cost: {type: Number, required: true},
    paymentStatus: {type: String, enum: ['paid','pending','failed'], default: 'pending'}
	//timestamp:{type:Date, default: Date.now}
});


module.exports = mongoose.model('Trip',tripSchema);
