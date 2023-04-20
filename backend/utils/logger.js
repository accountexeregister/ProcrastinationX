const log = (...args) => {
	console.log(...args);
};

const errorLog = (...args) => {
	console.error(...args);
};

module.exports = { log, errorLog };