const jwt = require("jsonwebtoken");
const User = require("../models/user");
const logger = require("./logger");

const requestLogger = (request, response, next) => {
	logger.log("Method:", request.method);
	logger.log("Path:  ", request.path);
	logger.log("Body:  ", request.body);
	logger.log("---");
	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
	logger.errorLog(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	} else if (error.name === "JsonWebTokenError") {
		return response.status(400).json({ error: error.message });
	} else if (error.name === "TokenExpiredError") {
		return response.status(401).json({
			error: "token expired"
		});
	} else if (error.name === "LogOutError") {
		return response.status(400).send("Unable to log out");
	}
    
	next(error);
};

const getTokenFrom = request => {
	const authorization = request.get("authorization");
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		return authorization.substring(7);
	}
	return null;
};
  
const userExtractor = async (request, response, next) => {
	const token = getTokenFrom(request);
  
	if (token) {
		const decodedToken = jwt.verify(token, process.env.SECRET);
		if (!decodedToken.id) {
			return response.status(401).json({ error: "token invalid" });
		}
	
		request.user = await User.findById(decodedToken.id);
	}
  
	next();
};
  
module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	userExtractor
};