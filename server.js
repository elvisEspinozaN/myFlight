// dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
// const morgan = require('morgan');
// const session = require('express-session');

const flightsController = require('./controllers/flights');

// intialize express
const app = express();

// configure settings
require('dotenv').config();

const {
    DATABASE_URL,
    PORT,
} = process.env

mongoose.connect(DATABASE_URL);

const db = mongoose.connection;
db.on('connected', () => {
    console.log('Connected to MongoDB');
});
db.on('error', (error) => {
    console.log('MongoDB Error: ', error.message);
});

// mount middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// mount routers
app.use('/', flightsController);

// listener
app.listen(PORT, () => {
    console.log(`server on ${PORT}`);
});