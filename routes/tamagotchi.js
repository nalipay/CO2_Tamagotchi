const router = require("express").Router();

const bcryptjs = require("bcrypt");
const mongoose = require("mongoose");

const Tamagotchi = require('../models/Tamagotchi.model')
const User = require('../models/User.model')

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');



router.get("/", isLoggedIn, (req, res, next) => {
    const userId = req.session.currentUser._id;
    Tamagotchi.findOne({ user: userId })
        .then(tamagotchiFromDB => {
            let totalMovement = tamagotchiFromDB?.levelFeatures.walking + tamagotchiFromDB?.levelFeatures.cycling + tamagotchiFromDB?.levelFeatures.publicTransport
            let level = 0;
            const tamagotchiNotFound = !tamagotchiFromDB
            if (totalMovement >= 0 && totalMovement <= 50) {
                level = 1
            } else if (totalMovement >= 51 && totalMovement <= 100) {
                level = 2
            } else if (totalMovement >= 101) {
                level = 3
            } else if (totalMovement < 0) {
                level = 'Cheater!!'
            }
            
            
            console.log(totalMovement)
            res.render('user', { userInSession: req.session.currentUser, tamagotchiDetails: tamagotchiFromDB, level, tamagotchiNotFound })
        })
        .catch(err => next(err))
});

// Tamagotchi create
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
    console.log('random string')
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

// delete

router.get('/delete/:id', (req, res, next) => {
    const tamagotchiId = req.params.id
    Tamagotchi.findByIdAndDelete(tamagotchiId)
        .then(deletedTamagotchi => {
            console.log(deletedTamagotchi)
            res.redirect('/tamagotchi')
        })
        .catch(err => {
            next(err)
        });

})



module.exports = router;