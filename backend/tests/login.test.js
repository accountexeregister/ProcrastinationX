const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user");
const api = require("./setup_test");


beforeEach(async () => {
	await User.deleteMany({});

	const passwordHash = await bcrypt.hash("sekret", 10);
	const user = new User({ username: "root", passwordHash });

	await user.save();
});

test("login succeeds with registered user", async () => {
	const user = { username: "root", password: "sekret" };
	const result = await api
		.post("/api/login")
		.send(user)
		.expect(200)
		.expect("Content-Type", /application\/json/);

	expect(result.body.token).toBeDefined();
	expect(result.body.username).toBe(user.username);
});

describe("login fails with unregistered user", () => {
	test("Unregistered username", async () => {
		const user = { username: "tbd", password: "sekret" };
		const result = await api
			.post("/api/login")
			.send(user)
			.expect(401)
			.expect("Content-Type", /application\/json/);
    
		expect(result.body.token).toBeUndefined();
		expect(result.body.username).toBeUndefined();
		expect(result.body.error).toBe("invalid username or password");
	});

	test("Unregistered password", async () => {
		const user = { username: "root", password: "ekrets" };
		const result = await api
			.post("/api/login")
			.send(user)
			.expect(401)
			.expect("Content-Type", /application\/json/);
    
		expect(result.body.token).toBeUndefined();
		expect(result.body.username).toBeUndefined();
		expect(result.body.error).toBe("invalid username or password");
	});

	test("Unregistered username and password", async () => {
		const user = { username: "toor", password: "ekrets" };
		const result = await api
			.post("/api/login")
			.send(user)
			.expect(401)
			.expect("Content-Type", /application\/json/);
    
		expect(result.body.token).toBeUndefined();
		expect(result.body.username).toBeUndefined();
		expect(result.body.error).toBe("invalid username or password");
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});