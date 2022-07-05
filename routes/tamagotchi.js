const router = require("express").Router();

const bcryptjs = require("bcrypt");
const mongoose = require("mongoose");

const Tamagotchi = require('../models/Tamagotchi.model')

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');


// Tamagotchi create

router.post('/create', (req, res, next) => {
    const { username, password } = req.body


    User.findOne({ username: username })
        .then(userFromDB => {
            if (userFromDB !== null) {
                res.render('index', { signinMessage: 'Username is already taken' })
            } else {
                // and hash the password
                const salt = bcryptjs.genSaltSync()
                const hash = bcryptjs.hashSync(password, salt)
                // create the user
                User.create({ username, password: hash })
                    .then(createdUser => {
                        console.log(createdUser)
                        // if we want to log the user in using passport
                        // req.login()
                        res.redirect('/user')
                    })
                    .catch(err => next(err))
            }
        })
});


module.exports = router;