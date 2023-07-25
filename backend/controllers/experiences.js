const experiencesRouter = require("express").Router();
const User = require("../models/user");
const Experience = require("../models/experience");

experiencesRouter.put("/:userid/:xp", async (request, response) => {
    const user = await User.findById(request.params.userid);
    if (!user) {
        return response.status(401).send({Error: "User not found"});
    }
    const xpGained = request.params.xp;

    let userExperience = await Experience.findById(user.experience);
    const previousUserExperience = {...userExperience.toObject()};
    userExperience.currentXp = userExperience.currentXp + xpGained;

    while (userExperience.currentXp >= userExperience.requiredXp) {
        const currentRequiredXp = userExperience.requiredXp;
        userExperience.level++;
        userExperience.requiredXp = 300 * userExperience.level;
        userExperience.currentXp -= currentRequiredXp;
    } 

    await userExperience.save();

    response.status(200).json({
        before: {
            level: previousUserExperience.level,
            currentXp: previousUserExperience.currentXp,
            requiredXp: previousUserExperience.requiredXp
        },
        after: {
            level: userExperience.level,
            currentXp: userExperience.currentXp,
            requiredXp: userExperience.requiredXp
        }
    });
});

module.exports = experiencesRouter;