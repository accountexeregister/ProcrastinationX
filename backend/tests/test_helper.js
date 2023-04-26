const User = require("../models/user");
const Experience = require("../models/experience");

const usersInDb = async () => {
	const users = await User.find({});
	return users.map(u => u.toJSON());
};

const experiencesInDb = async () => {
	const experiences = await Experience.find({});
	return experiences.map(e => e.toJSON());
};

module.exports = {
	usersInDb,
	experiencesInDb
};