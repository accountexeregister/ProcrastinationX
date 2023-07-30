const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
	totalHoursWorked: {
        type: Number,
        required: true,
        min: 0,
        default: 25
    },
    totalHoursBreak: {
        type: Number,
        required: true,
        min: 0,
        default: 25
    },
	totalXp: {
        type: Number,
        required: true,
        min: 0,
        default: 25
    },
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

const Stat = mongoose.model("Stat", statSchema);
  
module.exports = Stat;