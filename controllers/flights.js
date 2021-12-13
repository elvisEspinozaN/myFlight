// dependencies
const express = require('express');
const Flight = require('../models/flights');
const flightSeed = require('../models/flightSeed')
const flightRouter = express.Router();

// seed route
flightRouter.get('/seed', (req, res) => {
    Flight.deleteMany({}, (error, flights) => {})
    Flight.create(flightSeed, (error, data) => {
        res.redirect('/flights')
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
    Flight.find({}, (error, flights) => {
        res.render('index.ejs', {
            tabTitle: 'Flights',
            flights,
        });
    });
});

// new
// delete
// update
// create
// edit

// buy
flightRouter.put('/flights/:id/buy', (req, res) => {
    Flight.findById(req.params.id, (error, flight) => {
        if (flight.quantity) {
            flight.quantity--
            flight.save(() => {
                res,
                res.redirect(`/flights/${flight._id}`)
            });
        } else {
            res.redirect(`/flights/${flight._id}`)
        };
    });
});


// show
flightRouter.get('/flights/:id', (req, res) => {
    Flight.findById(req.params.id, (error, flights) => {
        res.render('show.ejs', {
            tabTitle: 'todo',
            flights
        });
    });
});

module.exports = flightRouter;