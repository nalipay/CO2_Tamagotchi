const router = require("express").Router();

const bcryptjs = require("bcrypt");
const mongoose = require("mongoose");

const Tamagotchi = require('../models/Tamagotchi.model')
const User = require('../models/User.model')

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');


// Tamagotchi create
router.get("/", isLoggedIn, (req, res, next) => {
    res.render("user", { userInSession: req.session.currentUser },)
})


router.post('/create', (req, res, next) => {
    const userId = req.session.currentUser._id
    const { avatarName } = req.body
    console.log(userId)
    Tamagotchi.create({ avatarName: avatarName, user: userId })
        .then(createdAvatar => {
            console.log(createdAvatar, userId)

            res.redirect('/user')
        })
        .catch(err => next(err))

});


module.exports = router;