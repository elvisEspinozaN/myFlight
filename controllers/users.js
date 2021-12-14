// dependencies
const usersRouter = require('express').Router();
const User = require('../models/user');
const Flight = require('../models/flights')

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

// login
usersRouter.get('/login', (req, res) => {
    res.render('login.ejs', {
        tabTitle: 'Login',
        error: '',
    });
});

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
        res.redirect('dashboard')
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

// logout
usersRouter.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    });
});

// dashboard
usersRouter.get('/dashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    User.findById(req.session.user, (error, user) => {
        res.render('dashboard.ejs', {
            tabTitle: 'Profile',
            user,
        });
    });
});

// new profile
usersRouter.get('/dashboard/new', (req, res) => {
    res.render('new.ejs', {
        tabTitle: 'Add Profile',
    });
});

// create profile
usersRouter.post('/dashboard', (req, res) => {
    User.create(req.body, (error, user) => {
        res.redirect('/dashboard')
    });
});

// edit profile
usersRouter.get('/dashboard/:id/edit', (req, res) => {
    User.findById(req.params.id, (error, user) => {
        res.render('edit.ejs', {
            tabTitle: Editing,
            user,
        });
    });
});

// delete profile
usersRouter.delete('/dashboard/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (error, user) => {
        res.redirect('/dashboard')
    });
});

module.exports = usersRouter;