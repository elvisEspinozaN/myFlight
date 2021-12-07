const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    flight_date: {
        type: String,
        required: true
    },
    airline_name: {
        type: String,
        required: true
    },
    from_location: {
        type: String,
        required: true
    },
    to_location: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true,
    },
    departure_time: {
        type: String,
        required: true
    },
    arrival_time: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        min: 0
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String
    },
}, {
    timestamps: true
});

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;