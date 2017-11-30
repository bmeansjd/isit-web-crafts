var express = require('express');
var router = express.Router();

var isAuthenticated = function(request, response, next) {
    'use strict';

    // Passport added the this method to the request object.
    console.log('isAuthenticated called');
    //if (request.user.isAuthenticated()) {

    if (!request.isAuthenticated()){
        console.log('successfully authenticated');
        return next();
    };


    console.log('in isAuthenticated, user not authenticate, send to login');
    response.redirect('/login');
};

exports.getPackageDescription = function() {
    return 'This is Brenda Means package';
};

module.exports = function(passport) {
    'use strict';

    /* GET home page. */
    router.get('/',isAuthenticated,function(request, response, next) {
        'use strict';
        response.render('index', {
            title: 'Elven Site Options',
            author: 'Brenda Means'
        });
    });

    router.get('/login', function(req, res) {
        console.log('in get login');
        res.render('login', {
            title: 'Elf Login',
            user: req.user
        });
    });

    router.post('/loginUser', passport.authenticate('login', {
        successRedirect: '/#/login',
        failureRedirect: '/#/login'
    }));

    router.get('/loggedin', function(request, response) {
        response.send(request.isAuthenticated());
    });

    router.get('/signup', function(req, res) {
        console.log('Get sign-up');
        res.render('register', {});
    });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/#/login',
        failureRedirect: '/#/login'
    }));

    return router;
};
