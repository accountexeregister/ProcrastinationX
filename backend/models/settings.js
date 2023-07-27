const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
	workMinutes: {
        type: Number,
        required: true,
        min: 0,
        max: 120,
        default: 25
    },
	workSeconds: {
        type: Number,
        required: true,
        min: 0,
        max: 59,
        default: 0
    },
	breakMinutes: {
        type: Number,
        required: true,
        min: 0,
        max: 120,
        default: 25
    },
    breakSeconds: {
        type: Number,
        required: true,
        min: 0,
        max: 59,
        default: 0
    },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
});

settingsSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

const Settings = mongoose.model("Settings", settingsSchema);
  
module.exports = Settings;