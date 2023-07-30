const statsRouter = require("express").Router();
const User = require("../models/user");
const Stat = require("../models/stat");

statsRouter.get("/:userid/stats", async (request, response) => {
	const user = await User.findById(request.params.userid).populate("stats");
	response.json(user.stats);
});

statsRouter.put("/:userid/stats/work/:sec", async (request, response, next) => {
    const user = await User.findById(request.params.userid);
    if (!user) {
        return response.status(401).send({Error: "User not found"});
    }

    const sec = Number(request.params.sec);
    
    let userStats = await Stat.findById(user.stats);
    const previousUserStats = {...userStats.toObject()};
    userStats.totalSecondsWorked += sec;

    try {
        await userStats.save();
    } catch (error) {
        return next(error);
    }

    response.status(200).json({
        before: {
            totalSecondsWorked: previousUserStats.totalSecondsWorked,
        },
        after: {
            totalSecondsWorked: userStats.totalSecondsWorked,
        }
    });
});

statsRouter.put("/:userid/stats/break/:sec", async (request, response, next) => {
    const user = await User.findById(request.params.userid);
    if (!user) {
        return response.status(401).send({Error: "User not found"});
    }

    const sec = Number(request.params.sec);
    
    let userStats = await Stat.findById(user.stats);
    const previousUserStats = {...userStats.toObject()};
    userStats.totalSecondsBreak += sec;

    try {
        await userStats.save();
    } catch (error) {
        return next(error);
    }

    response.status(200).json({
        before: {
            totalSecondsBreak: previousUserStats.totalSecondsBreak,
        },
        after: {
            totalSecondsBreak: userStats.totalSecondsBreak,
        }
    });
});

module.exports = statsRouter;