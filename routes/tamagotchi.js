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

// Tamagotchi update walking
router.get('/walking/:id', (req, res, next) => {
    const tamagotchiId = req.params.id
    Tamagotchi.findById(tamagotchiId)
        .then(tamagotchiFromDB => {
            console.log(tamagotchiFromDB)
            res.render('user', { tamagotchiDetails: tamagotchiFromDB })
        })
        .catch(err => {
            next(err)
        })
});

router.post('/walking/:id', (req, res, next) => {
    const tamagotchiId = req.params.id
    const { km } = req.body
    //path to tamagotchi model key has to be a string when nested :'levelFeatures.walking'
    Tamagotchi.findByIdAndUpdate(tamagotchiId, { $inc: { 'levelFeatures.walking': km } }, { new: true })
        .then(() => {
            res.redirect('/tamagotchi')
        })
        .catch(err => {
            next(er)
        })
});

// Tamagotchi update cycling
router.get('/cycling/:id', (req, res, next) => {
    const tamagotchiId = req.params.id
    Tamagotchi.findById(tamagotchiId)
        .then(tamagotchiFromDB => {
            console.log(tamagotchiFromDB)
            res.render('user', { tamagotchiDetails: tamagotchiFromDB })
        })
        .catch(err => {
            next(err)
        })
});

router.post('/cycling/:id', (req, res, next) => {
    const tamagotchiId = req.params.id
    const { km } = req.body
    Tamagotchi.findByIdAndUpdate(tamagotchiId, { $inc: { 'levelFeatures.cycling': km } }, { new: true })
        .then(() => {
            res.redirect('/tamagotchi')
        })
        .catch(err => {
            next(er)
        })
});

// Tamagotchi update publicTransport
router.get('/publicTransport/:id', (req, res, next) => {
    const tamagotchiId = req.params.id
    Tamagotchi.findById(tamagotchiId)
        .then(tamagotchiFromDB => {
            console.log(tamagotchiFromDB)
            res.render('user', { tamagotchiDetails: tamagotchiFromDB })
        })
        .catch(err => {
            next(err)
        })
});

router.post('/publicTransport/:id', (req, res, next) => {
    const tamagotchiId = req.params.id
    const { km } = req.body
    Tamagotchi.findByIdAndUpdate(tamagotchiId, { $inc: { 'levelFeatures.publicTransport': km } }, { new: true })
        .then(() => {
            res.redirect('/tamagotchi')
        })
        .catch(err => {
            next(er)
        })
});

module.exports = router;