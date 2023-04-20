const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

module.exports = api;