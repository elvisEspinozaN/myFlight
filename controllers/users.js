// dependencies

const usersRouter = require('express').Router();
const User = require('../models/user');

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

// login
usersRouter.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    }, (error, user) => {
        if (!foundUser) return res.render('login.ejs', {
            tabTitle: 'Login',
            error: 'Invalid Credentials.',
        });
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.render('login.ejs', {
                tabTitle: 'Login',
                error: 'Invalid Credentials.',
            });
        }
        req.session.user = user._id;
        res.redirect('dahsboard')
    });
});

// signup
usersRouter.get('/signup', (req, res) => {
    res.render('signup.ejs', {
        tabTitle: 'Signup',
    });
});

usersRouter.post('/signup', (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_ROUNDS));
    req.body.password = hash;
    User.create(req.body, (error, user) => {
        req.session.user = user._id;
        res.redirect('/dashboard');
    });
});