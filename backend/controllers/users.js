const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Experience = require("../models/experience");
const Settings = require("../models/settings");

usersRouter.post("/", async (request, response) => {
	const { username, name, password } = request.body;
  
	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);
  
	const user = new User({
		username,
		name,
		passwordHash,
	});

	let savedUser = await user.save();

	const experience = new Experience({
		level: 1,
		currentXp: 0,
		requiredXp: 300,
		user: savedUser._id
	});

	const savedExperience = await experience.save();

	// Settings with default values defined in ../models/settings.js
	const settings = new Settings({ user: savedUser._id });
	const savedSettings = await settings.save();

	savedUser.experience = savedExperience._id;
	savedUser.settings = savedSettings._id;
	savedUser = await savedUser.save();
	response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
	const users = await User.find({});
	response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
	const user = await User.findById(request.params.id).populate("experience").populate("settings");
	response.json(user);
});

usersRouter.delete("/logout", async (request, response, next) => {
	if (request.session) {
	  request.session.destroy(err => {
		if (err) {
		  err.name = "LogOutError"
		  next(err)
		} else {
		  response.send("Logout successful");
		}
	  });
	} else {
	  response.end();
	}
  })
  
module.exports = usersRouter;