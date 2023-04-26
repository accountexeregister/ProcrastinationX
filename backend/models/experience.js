const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
	level: Number,
	currentXp: Number,
	requiredXp: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
});

experienceSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

const Experience = mongoose.model("Experience", experienceSchema);
  
module.exports = Experience;