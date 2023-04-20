const app = require("./app.js");
const { log } = require("./utils/logger");

const port = process.env.PORT || 3001;

app.listen(port, () => {
	log(`Server running on ${port}`);
});