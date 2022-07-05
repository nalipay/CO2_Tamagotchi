const router = require("express").Router();

const bcryptjs = require("bcrypt");
const mongoose = require("mongoose");

const Tamagotchi = require('../models/Tamagotchi.model')
const User = require('../models/User.model')

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');


// Tamagotchi create
router.get("/", isLoggedIn, (req, res, next) => {
    const userId = req.session.currentUser._id;
    Tamagotchi.findOne({ user: userId })
        .then(tamagotchiFromDB => {
            console.log(userId, tamagotchiFromDB)
            res.render('user', { userInSession: req.session.currentUser, tamagotchiDetails: tamagotchiFromDB })
        })
        .catch(err => next(err))
});


router.post('/create', (req, res, next) => {
    const userId = req.session.currentUser._id
    const { avatarName } = req.body
    Tamagotchi.create({ avatarName: avatarName, user: userId })
        .then(createdAvatar => {
            console.log(createdAvatar, userId)
            res.redirect('/tamagotchi')
        })
        .catch(err => next(err))
});


module.exports = router;