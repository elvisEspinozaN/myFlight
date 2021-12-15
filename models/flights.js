const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    date: {
        type: String,
    },
    airline: {
        type: String,
    },
    from: {
        type: String,
    },
    to: {
        type: String,
    },
    duration: {
        type: Number,
    },
    departure: {
        type: String,
    },
    arrival: {
        type: String,
    },
    quantity: {
        type: Number,
        min: 0
    },
    price: {
        type: Number,
    },
    img: {
        type: String
    },
}, {
    timestamps: true
});

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;