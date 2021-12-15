// dependencies
const express = require('express');
const Flight = require('../models/flights');
const User = require('../models/user')
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
flightRouter.get('/mywish', (req, res) => {
    const user = User.findById(req.params.user)
    res.render('new.ejs', {
        user,
    });
});

// delete
flightRouter.delete('/:id', (req, res) => {
    const flight = Flight.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard')
});

// update
flightRouter.put('/:id', (req, res) => {
    Flight.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true
        },
        (error, flight) => {
            res.redirect(`/dashboard/${req.params.id}`)
        });
});

// create
flightRouter.post('/dashboard', (req, res) => {
    Flight.create(req.body, (error, flight) => {
        res.redirect('/dashboard')
    });
});

// edit
flightRouter.get('/dashboard/:id/edit', (req, res) => {
    const user = User.findById(req.session.user)
    const flight = Flight.findById(req.params.id)
    res.render('edit.ejs', {
        flight,
        user
    })
})

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