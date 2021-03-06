// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

// helper for function if in hbs
hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
	return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "CO2_Tamagotchi";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;


const session = require('express-session')
const MongoStore = require('connect-mongo')

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		cookie: { maxAge: 1000 * 60 * 60 * 24 },
		resave: true,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: process.env.MONGODB_URI
		})
	})
)


// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/auth");
app.use("/user", authRoutes);

const tamagotchiRoutes = require("./routes/tamagotchi");
app.use("/tamagotchi", tamagotchiRoutes);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
