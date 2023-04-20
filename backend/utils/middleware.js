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
	} 
    
	next(error);
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler
};