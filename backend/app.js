const { MONGODB_URI } = require("./utils/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { log, errorLog } = require("./utils/logger");
require("express-async-errors");
let session = require("express-session");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const experiencesRouter = require("./controllers/experiences");
const settingsRouter = require("./controllers/settings");
const middleware = require("./utils/middleware");

mongoose.set("strictQuery", false);

(async() => {
	try {
		await mongoose.connect(MONGODB_URI);
		log("Connected to mongodb uri, ", MONGODB_URI);
	} catch (error) {
		errorLog("Failed to connect to mongodb uri, ", MONGODB_URI, error);
	}
})();

app.use(session({
	secret: process.env.SECRET,
	resave: true,
	saveUninitialized: true
}));
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.userExtractor);


app.use("/api/users", usersRouter, experiencesRouter, settingsRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;