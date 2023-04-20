const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { log, errorLog } = require("./utils/logger");

(async() => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		log("Connected to mongodb uri, ", process.env.MONGODB_URI);
	} catch (error) {
		errorLog("Failed to connect to mongodb uri, ", process.env.MONGODB_URI, error);
	}
})();

module.exports = app;