const User = require("../models/user");
const Experience = require("../models/experience");
const Settings = require("../models/settings");

const beforeEachSetup = async () => {
	await User.deleteMany({});
	await Experience.deleteMany({});
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map(u => u.toJSON());
};

const experiencesInDb = async () => {
	const experiences = await Experience.find({});
	return experiences.map(e => e.toJSON());
};

const settingsInDb = async () => {
	const settings = await Settings.find({});
	return settings.map(s => s.toJSON());
};



module.exports = {
	beforeEachSetup,
	usersInDb,
	experiencesInDb,
	settingsInDb
};