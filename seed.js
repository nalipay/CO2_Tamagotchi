const mongoose = require('mongoose')

const User = require('./models/User.model')

mongoose.connect('mongodb://localhost:27017/CO2_Tamagotchi')



const users = [
    {
        username: "Tim",
        password: "12345"
    },
    {
        username: "Julie",
        password: "abcde"
    }
]

User.create(users)
	.then(usersFromDB => {
		console.log(`${usersFromDB.length} user got created`)
		mongoose.connection.close()
	})
	.catch(err => console.log(err))