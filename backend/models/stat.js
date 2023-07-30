const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
	totalHoursWorked: Number,
    totalHoursBreak: Number,
	totalXp: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
});

statSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

const Stat = mongoose.model("Experience", statSchema);
  
module.exports = Stat;