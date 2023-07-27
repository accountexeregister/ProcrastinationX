const settingsRouter = require("express").Router();
const User = require("../models/user");
const Settings = require("../models/settings");

settingsRouter.put("/:userid/settings/", async (request, response, next) => {
    const user = await User.findById(request.params.userid);
    if (!user) {
        return response.status(401).send({Error: "User not found"});
    }

    const { workMinutes, workSeconds, breakMinutes, breakSeconds } = request.body;
    
    let userSettings = await Settings.findById(user.settings);
    const previousUserSettings = {...userSettings.toObject()};
    userSettings = {
        ...userSettings,
        workMinutes,
        workSeconds,
        breakMinutes,
        breakSeconds
    }

    try {
        await userSettings.save();
    } catch (error) {
        next(error);
    }

    response.status(200).json({
        before: {
            workMinutes: previousUserSettings.workMinutes,
            workSeconds: previousUserSettings.workSeconds,
            breakMinutes: previousUserSettings.breakMinutes,
            breakSeconds: previousUserSettings.breakSeconds
        },
        after: {
            workMinutes: userSettings.workMinutes,
            workSeconds: userSettings.workSeconds,
            breakMinutes: userSettings.breakMinutes,
            breakSeconds: userSettings.breakSeconds
        }
    });
});

module.exports = settingsRouter;