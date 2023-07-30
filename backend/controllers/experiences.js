const experiencesRouter = require("express").Router();
const User = require("../models/user");
const Experience = require("../models/experience");
const Stat = require("../models/stat");

experiencesRouter.put("/:userid/xp/:xp", async (request, response) => {
    const user = await User.findById(request.params.userid);
    if (!user) {
        return response.status(401).send({Error: "User not found"});
    }
    const xpGained = Number(request.params.xp);

    let userExperience = await Experience.findById(user.experience);
    let userStats = await Stat.findById(user.stats);

    const previousUserExperience = {...userExperience.toObject()};
    userExperience.currentXp = userExperience.currentXp + xpGained;

    while (userExperience.currentXp >= userExperience.requiredXp) {
        const currentRequiredXp = userExperience.requiredXp;
        userExperience.level++;
        userExperience.requiredXp = 300 * userExperience.level;
        userExperience.currentXp -= currentRequiredXp;
    } 

    await userExperience.save();

    const previousTotalXp = userStats.totalXp;
    userStats.totalXp += xpGained;
    await userStats.save();

    response.status(200).json({
        before: {
            level: previousUserExperience.level,
            currentXp: previousUserExperience.currentXp,
            requiredXp: previousUserExperience.requiredXp,
            totalXp: previousTotalXp
        },
        after: {
            level: userExperience.level,
            currentXp: userExperience.currentXp,
            requiredXp: userExperience.requiredXp,
            totalXp: userStats.totalXp
        }
    });
});

module.exports = experiencesRouter;