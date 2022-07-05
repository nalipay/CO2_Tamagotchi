const router = require("express").Router();

const bcryptjs = require("bcrypt");
const mongoose = require("mongoose");

const User = require('../models/User.model')

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');


// User signup

router.get("/", isLoggedIn, (req, res, next) => {
    res.render("user", { userInSession: req.session.currentUser })
})

router.post('/signup', (req, res, next) => {
	const { username, password } = req.body

    if (password.length < 4) {

		res.render('index', { signinMessage: 'Your password needs to be min 4 chars' })
		return
	}
	if (username.length === 0) {
		res.render('index', { signinMessage: 'Your username cannot be empty' })
		return
	}
	
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

// User Login

router.post('/login', (req, res, next) => {
    const {username, password} = req.body

    console.log('SESSION =====> ', req.session)


    if (username === '' || password === '') {
        res.render('index', {loginMessage: 'Enter username and password.'}) 
        return
    }

    User.findOne({ username }) 
    .then(user => {
      if (!user) {
        res.render('index', {
          loginMessage: 'This user is not registered.'
        });
        return
      }
      else if (bcryptjs.compareSync(password, user.password)) {
        // res.render('users/user-profile', { user })
        req.session.currentUser = user;
        res.redirect('/user');
      } else {
        res.render('index', { loginMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
})

// logout

router.get("/logout", function(req, res) {
    req.session.destroy(() => {
     res.redirect("/"); //Inside a callback… bulletproof!
    });
   });

// delete

router.get('/delete/:id', (req, res, next) => {
	const userId = req.params.id


	User.findByIdAndDelete(userId)
		.then(deletedUser => {
			console.log(deletedUser)
			res.redirect('/')
		})
		.catch(err => {
			next(err)
		});

    })

module.exports = router;