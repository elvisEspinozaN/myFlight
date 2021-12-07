const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    flight_id: {
        type: Number,
        required: true
    },
    airline_name: {
        type: String,
        required: true
    },
    from_location: {
        type: String,
        required: true,
        uppercase: true
    },
    to_location: {
        type: String,
        required: true,
        uppercase: true
    },
    departure_time: {
        type: Number,
        required: true
    },
    arrival_time: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        min: 0
    },
})

module.exports = mongoose.model('Flight', flightSchema);