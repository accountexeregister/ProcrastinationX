const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user");
const Experience = require("../models/experience");
const api = require("./setup_test");
const helper = require("./test_helper");

beforeEach(async () => {
	await helper.beforeEachSetup();
});

describe("when there is initially one user at db", () => {
	beforeEach(async () => {
		const passwordHash = await bcrypt.hash("sekret", 10);
		const user = new User({ username: "root", passwordHash });
	
		await user.save();
	});

	test("find user by id", async () => {
		const newUser = {
			username: "mluukkai",
			name: "Matti Luukkainen",
			password: "salainen",
		};
		await api.post("/api/users")
			.send(newUser);

		const savedUser = await User.findOne({}).populate("experience").populate("settings");
		const user = await User.findById(savedUser._id);

		const result = await api.get(`/api/users/${user._id}`);
		expect(result.body).toEqual(user.toJSON());
	});

	test("creation succeeds with a fresh username", async () => {
		await helper.beforeEachSetup();
		const usersAtStart = await helper.usersInDb();
		const experiencesAtStart = await helper.experiencesInDb();
		const settingsAtStart = await helper.settingsInDb();
  
		const newUser = {
			username: "mluukkai",
			name: "Matti Luukkainen",
			password: "salainen",
		};
  
		const result = await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/);
		
		let savedUser = result.body;
		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
  
		const usernames = usersAtEnd.map(u => u.username);
		expect(usernames).toContain(newUser.username);

		const experiencesAtEnd = await helper.experiencesInDb();
		expect(experiencesAtEnd).toHaveLength(experiencesAtStart.length + 1);
		expect(savedUser.experience.toString()).toBe(experiencesAtEnd[0].id);
		expect(experiencesAtEnd[0].user.toString()).toBe(savedUser.id);

		const settingsAtEnd = await helper.settingsInDb();
		expect(settingsAtEnd).toHaveLength(settingsAtStart.length + 1);
		expect(savedUser.settings.toString()).toBe(settingsAtEnd[0].id);
		expect(settingsAtEnd[0].user.toString()).toBe(savedUser.id);

		savedUser = await User.findById(savedUser.id).populate("experience").populate("settings").populate("stats");

		const savedUserSettings = {
			workMinutes: savedUser.settings.workMinutes,
			workSeconds: savedUser.settings.workSeconds,
			breakMinutes: savedUser.settings.breakMinutes,
			breakSeconds: savedUser.settings.breakSeconds
		};
		expect(savedUserSettings).toEqual({
			workMinutes: 25,
			workSeconds: 0,
			breakMinutes: 5,
			breakSeconds: 0
		});

		const savedUserStats = {
			totalHoursWorked: savedUser.stats.totalHoursWorked,
			totalHoursBreak: savedUser.stats.totalHoursBreak,
			totalXp: savedUser.stats.totalXp,
		};
		expect(savedUserStats).toEqual({
			totalHoursWorked: 0,
			totalHoursBreak: 0,
			totalXp: 0,
		});
	}, 50000);
  
	test("creation fails with proper statuscode and message if username already taken", async () => {
		const usersAtStart = await helper.usersInDb();
  
		const newUser = {
			username: "root",
			name: "Superuser",
			password: "salainen",
		};
  
		const result = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);
  
		expect(result.body.error).toContain("expected `username` to be unique");
  
		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	}, 500000000);
});

describe("User experience", () => {
	beforeEach(async () => {
		const newUser = {
			username: "mluukkai",
			name: "Matti Luukkainen",
			password: "salainen",
		};
		await api.post("/api/users")
			.send(newUser);
	});

	test("Update currentXp", async () => {  
		const savedUser = await User.findOne({}).populate("experience").populate("stats");
		const previousExperience = {
			level: savedUser.experience.level,
			currentXp: savedUser.experience.currentXp,
			requiredXp: savedUser.experience.requiredXp,
			totalXp: savedUser.stats.totalXp
		};

		const result = await api
			.put(`/api/users/${savedUser._id}/xp/${150}`)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		expect(result.body).toEqual({
			before: previousExperience,
			after: {
				level: previousExperience.level,
				currentXp: previousExperience.currentXp + 150,
				requiredXp: previousExperience.requiredXp,
				totalXp: previousExperience.totalXp + 150
			}
		});

		const updatedUser = await User.findById(savedUser._id.toString()).populate("experience").populate("stats");
		const updatedUserExperience = {
			level: updatedUser.experience.level,
			currentXp: updatedUser.experience.currentXp,
			requiredXp: updatedUser.experience.requiredXp,
			totalXp: updatedUser.stats.totalXp
		};
		expect(updatedUserExperience).toEqual({
			level: previousExperience.level,
			currentXp: previousExperience.currentXp + 150,
			requiredXp: previousExperience.requiredXp,
			totalXp: previousExperience.currentXp + 150
		});
	}, 50000);

	test("Update currentXp to level up", async () => {  
		const savedUser = await User.findOne({}).populate("experience").populate("stats");
		const previousExperience = {
			level: savedUser.experience.level,
			currentXp: savedUser.experience.currentXp,
			requiredXp: savedUser.experience.requiredXp,
			totalXp: savedUser.stats.totalXp
		};

		const result = await api
			.put(`/api/users/${savedUser._id}/xp/${300}`)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		expect(result.body).toEqual({
			before: previousExperience,
			after: {
				level: previousExperience.level + 1,
				currentXp: 0,
				requiredXp: 300 * (previousExperience.level + 1),
				totalXp: previousExperience.totalXp + 300
			}
		});

		const updatedUser = await User.findById(savedUser._id.toString()).populate("experience").populate("stats");
		const updatedUserExperience = {
			level: updatedUser.experience.level,
			currentXp: updatedUser.experience.currentXp,
			requiredXp: updatedUser.experience.requiredXp,
			totalXp: updatedUser.stats.totalXp
		};
		expect(updatedUserExperience).toEqual({
			level: previousExperience.level + 1,
			currentXp: 0,
			requiredXp: 300 * (previousExperience.level + 1),
			totalXp: previousExperience.totalXp + 300
		});
	}, 50000);

	test("Skip few levels", async () => {  
		const savedUser = await User.findOne({}).populate("experience").populate("stats");
		const previousExperience = {
			level: savedUser.experience.level,
			currentXp: savedUser.experience.currentXp,
			requiredXp: savedUser.experience.requiredXp,
			totalXp: savedUser.stats.totalXp
		};

		const result = await api
			.put(`/api/users/${savedUser._id}/xp/${950}`)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		expect(result.body).toEqual({
			before: previousExperience,
			after: {
				level: previousExperience.level + 2,
				currentXp: 50,
				requiredXp: 300 * (previousExperience.level + 2),
				totalXp: previousExperience.totalXp + 950
			}
		});

		const updatedUser = await User.findById(savedUser._id.toString()).populate("experience").populate("stats");
		const updatedUserExperience = {
			level: updatedUser.experience.level,
			currentXp: updatedUser.experience.currentXp,
			requiredXp: updatedUser.experience.requiredXp,
			totalXp: updatedUser.stats.totalXp
		};
		expect(updatedUserExperience).toEqual({
			level: previousExperience.level + 2,
			currentXp: 50,
			requiredXp: 300 * (previousExperience.level + 2),
			totalXp: previousExperience.totalXp + 950
		});
	}, 50000);
});

describe("User settings", () => {
	beforeEach(async () => {
		const newUser = {
			username: "mluukkai",
			name: "Matti Luukkainen",
			password: "salainen",
		};
		await api.post("/api/users")
			.send(newUser);
	});

	test("Update settings", async () => {  
		const savedUser = await User.findOne({}).populate("settings");
		const previousSettings = {
			workMinutes: savedUser.settings.workMinutes,
			workSeconds: savedUser.settings.workSeconds,
			breakMinutes: savedUser.settings.breakMinutes,
			breakSeconds: savedUser.settings.breakSeconds
		};

		const updatedSettings = {
			workMinutes: 45,
			workSeconds: 0,
			breakMinutes: 0,
			breakSeconds: 59
		};

		const result = await api
			.put(`/api/users/${savedUser._id}/settings`)
			.send(updatedSettings)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		expect(result.body).toEqual({
			before: previousSettings,
			after: updatedSettings
		});

		const updatedUser = await User.findById(savedUser._id.toString()).populate("settings");
		const updatedUserSettings = {
			workMinutes: updatedUser.settings.workMinutes,
			workSeconds: updatedUser.settings.workSeconds,
			breakMinutes: updatedUser.settings.breakMinutes,
			breakSeconds: updatedUser.settings.breakSeconds
		};
		expect(updatedUserSettings).toEqual(updatedSettings);
	}, 50000);

	test("Update settings out of range", async () => {  
		const savedUser = await User.findOne({}).populate("settings");
		const previousSettings = {
			workMinutes: savedUser.settings.workMinutes,
			workSeconds: savedUser.settings.workSeconds,
			breakMinutes: savedUser.settings.breakMinutes,
			breakSeconds: savedUser.settings.breakSeconds
		};

		const updatedSettings = {
			workMinutes: 135,
			workSeconds: 0,
			breakMinutes: 200,
			breakSeconds: 60
		};

		const result = await api
			.put(`/api/users/${savedUser._id}/settings`)
			.send(updatedSettings)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		const updatedUser = await User.findById(savedUser._id.toString()).populate("settings");
		const updatedUserSettings = {
			workMinutes: updatedUser.settings.workMinutes,
			workSeconds: updatedUser.settings.workSeconds,
			breakMinutes: updatedUser.settings.breakMinutes,
			breakSeconds: updatedUser.settings.breakSeconds
		};
		expect(updatedUserSettings).toEqual(previousSettings);
	}, 50000);
});
  
afterAll(async () => {
	await mongoose.connection.close();
});