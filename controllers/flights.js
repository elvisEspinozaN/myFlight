// dependencies
const express = require('express');
const Flight = require('../models/flights');
const flightSeed = require('../models/flightSeed')
const flightRouter = express.Router();

// seed route
flightRouter.get('/seed', (req, res) => {
    Flight.deleteMany({}, (error, flight) => {})
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
flightRouter.get('/flights/new', (req, res) => {
    res.render('f-new.ejs', {
        tabTitle: 'My Wish',
    });
});

// delete
flightRouter.delete('/flights/:id', (req, res) => {
    Flight.findByIdAndDelete(req.params.id, (error, flight) => {
        res.redirect('/flights')
    });
});

// update
flightRouter.put('/flights/:id', (req, res) => {
    Flight.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true
        },
        (error, flight) => {
            res.redirect(`/flights/${req.params.id}`)
        });
});

// create
flightRouter.post('/flights', (req, res) => {
    Flight.create(req.body, (error, flight) => {
        res.redirect('/flights')
    });
});

// edit
flightRouter.get('/flights/:id/edit', (req, res) => {
    Flight.findById(req.params.id, (error, flight) => {
        res.render('f-edit.ejs', {
            flight,
            tabTitle: 'Editing',
        });
    });
});

// buy
flightRouter.put('/flights/:id/buy', (req, res) => {
    Flight.findById(req.params.id, (error, flight) => {
        if (flight.quantity) {
            flight.quantity--
            flight.save(() => {
                res.redirect(`/flights/${flight._id}`)
            });
        } else {
            res.redirect(`/flights/${flight._id}`)
        };
    });
});


// show
flightRouter.get('/flights/:id', (req, res) => {
    Flight.findById(req.params.id, (error, flight) => {
        res.render('show.ejs', {
            tabTitle: 'todo',
            flight
        });
    });
});

module.exports = flightRouter;