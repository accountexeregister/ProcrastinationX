require("dotenv").config();
const app = require("./app.js");
const { log } = require("./utils/logger");
const { port } = require("./utils/config");

app.listen(port, () => {
	log(`Server running on ${port}`);
});