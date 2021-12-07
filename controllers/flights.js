// dependencies
const express = require('express');
const { findById } = require('../models/flights');
const flightRouter = express.Router();
const Flight = require('../models/flights');
const flightSeed = require('../models/flightSeed')

// seed route
flightRouter.get('/seed', (req, res) => {
    Flight.deleteMany({}, (error, allFlights) => {})
    Flight.create(flightSeed, (error, data) => {
        res.redirect('/')
    });
});

// home page
flightRouter.get('/', (req, res) => {
    res.render('home.ejs', {
        tabTitle: 'Home',
    });
});

// index 
flightRouter.get('/flights', (req, res) => {
    res.render('index.ejs', {
        tabTitle: 'Flights',
    });
});

// new


// delete


// update


// create


// edit

// buy


// show
flightRouter.get('/flights/:id', (req, res) => {
    Flight.findById(req.params.id, (error, flight) => {
        res.render('show.ejs', {
            tabTitle:'todo'
        });
    }); 
});




module.exports = flightRouter;