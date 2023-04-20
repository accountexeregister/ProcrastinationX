const { MONGODB_URI } = require("./utils/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { log, errorLog } = require("./utils/logger");
require("express-async-errors");
const middleware = require("./utils/middleware");
const usersRouter = require("./controllers/users");

mongoose.set("strictQuery", false);

(async() => {
	try {
		await mongoose.connect(MONGODB_URI);
		log("Connected to mongodb uri, ", MONGODB_URI);
	} catch (error) {
		errorLog("Failed to connect to mongodb uri, ", MONGODB_URI, error);
	}
})();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/users", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;