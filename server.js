// dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const flightsController = require('./controllers/flights');
const userController = require('./controllers/users');

// intialize express
const app = express();

// configure settings
require('dotenv').config();

const { DATABASE_URL, PORT, SECRET } = process.env

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected MongoDB');
});

db.on('error', (error) => {
    console.log('MongoDB Error: ', error.message);
});

// mount middleware
app.use(morgan('dev'));

app.use(express.urlencoded({
    extended: false
}));

app.use(express.static('public'));

app.use(methodOverride('_method'));

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(async function (req, res, next) {
    if (req.session && req.session.user) {
        const user = await require('./models/user').findById(req.session.user)
        res.locals.user = user;
    } else {
        res.locals.user = null;
    };
    next();
});

// mount routers
app.use('/', flightsController);
app.use('/', userController);

// listener
app.listen(PORT, () => {
    console.log(`server on ${PORT}`);
});