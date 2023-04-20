const { port } = require("./utils/config");
const app = require("./app.js");
const { log } = require("./utils/logger");

app.listen(port, () => {
	log(`Server running on ${port}`);
});