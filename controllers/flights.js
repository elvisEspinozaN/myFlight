// dependencies
const express = require('express');
const {
    findByIdAndUpdate
} = require('../models/flights');
const flights = require('../models/flights')
const flightsSeed = require('../models/flightsSeed.js')

// route objects
const flightRouter = express.Router();
const Flight = require('../models/flights');

// seed route
flightRouter.get('/seed', (req, res) => {
    Flight.deleteMany({}, (error, allFlights) => {})
    Flight.create(flightsSeed, (error, data) => {
        res.redirect('/')
    });
});

// index


// new


// delete


// update


// create


// edit


// show


// buy



module.exports = flightRouter;