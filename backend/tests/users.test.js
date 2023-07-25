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

		const savedUser = await User.findOne({}).populate("experience");
		const user = await User.findById(savedUser._id);

		const result = await api.get(`/api/users/${user._id}`);
		expect(result.body).toEqual(user.toJSON());
	});

	test("creation succeeds with a fresh username", async () => {
		const usersAtStart = await helper.usersInDb();
		const experiencesAtStart = await helper.experiencesInDb();
  
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

		savedUser = await User.findById(savedUser.id).populate("experience");
		const savedUserExperience = {
			level: savedUser.experience.level,
			currentXp: savedUser.experience.currentXp,
			requiredXp: savedUser.experience.requiredXp
		};
		expect(savedUserExperience).toEqual({
			level: 1,
			currentXp: 0,
			requiredXp: 300,
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
		const savedUser = await User.findOne({}).populate("experience");
		const previousExperience = {
			level: savedUser.experience.level,
			currentXp: savedUser.experience.currentXp,
			requiredXp: savedUser.experience.requiredXp
		};

		const result = await api
			.put(`/api/users/${savedUser._id}/${150}`)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		expect(result.body).toEqual({
			before: previousExperience,
			after: {
				level: previousExperience.level,
				currentXp: previousExperience.currentXp + 150,
				requiredXp: previousExperience.requiredXp
			}
		});
	}, 50000);

	test("Update currentXp to level up", async () => {  
		const savedUser = await User.findOne({}).populate("experience");
		const previousExperience = {
			level: savedUser.experience.level,
			currentXp: savedUser.experience.currentXp,
			requiredXp: savedUser.experience.requiredXp
		};

		const result = await api
			.put(`/api/users/${savedUser._id}/${300}`)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		expect(result.body).toEqual({
			before: previousExperience,
			after: {
				level: previousExperience.level + 1,
				currentXp: 0,
				requiredXp: 300 * (previousExperience.level + 1)
			}
		});
	}, 50000);

	test("Skip few levels", async () => {  
		const savedUser = await User.findOne({}).populate("experience");
		const previousExperience = {
			level: savedUser.experience.level,
			currentXp: savedUser.experience.currentXp,
			requiredXp: savedUser.experience.requiredXp
		};

		const result = await api
			.put(`/api/users/${savedUser._id}/${950}`)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		expect(result.body).toEqual({
			before: previousExperience,
			after: {
				level: previousExperience.level + 2,
				currentXp: 50,
				requiredXp: 300 * (previousExperience.level + 2)
			}
		});
	}, 50000);
});
  
afterAll(async () => {
	await mongoose.connection.close();
});