const mongoose = require('mongoose')

const User = require('./models/User.model')
//const Tamagotchi = require('./models/Tamagotchi.model')

require("dotenv/config");
const mongouri = process.env.MONGODB_URI
mongoose.connect(mongouri)

//SEEDING von user model
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


// SEEDING von Tamagotchi model

// const tamagotchis = [
//     {
//         avatarName: 'Karl',
//         levelFeatures: {
//             walking: 0,
//             cycling: 0,
//             publicTransport: 0
//         }
//     },
//     {
//         avatarName: 'Benny',
//         levelFeatures: {
//             walking: 0,
//             cycling: 0,
//             publicTransport: 0
//         }
//     }
// ]

// Tamagotchi.create(tamagotchis)
//     .then(tamagotchisFromDB => {
//         console.log(`${tamagotchisFromDB.length} avatars got created`)
//         mongoose.connection.close()
//     })
//     .catch(err => console.log(err))