const statsRouter = require("express").Router();
const User = require("../models/user");
const Stat = require("../models/stat");

statsRouter.put("/:userid/stats/work/:min", async (request, response, next) => {
    const user = await User.findById(request.params.userid);
    if (!user) {
        return response.status(401).send({Error: "User not found"});
    }

    const minutes = Number(request.params.min);
    
    let userStats = await Stat.findById(user.stats);
    const previousUserStats = {...userStats.toObject()};
    userStats.totalHoursWorked += 0.0166667 * minutes;

    try {
        await userStats.save();
    } catch (error) {
        return next(error);
    }

    response.status(200).json({
        before: {
            totalHoursWorked: previousUserStats.totalHoursWorked,
        },
        after: {
            totalHoursWorked: userStats.totalHoursWorked,
        }
    });
});

statsRouter.put("/:userid/stats/break/:min", async (request, response, next) => {
    const user = await User.findById(request.params.userid);
    if (!user) {
        return response.status(401).send({Error: "User not found"});
    }

    const minutes = Number(request.params.min);
    
    let userStats = await Stat.findById(user.stats);
    const previousUserStats = {...userStats.toObject()};
    userStats.totalHoursBreak += 0.0166667 * minutes;

    try {
        await userStats.save();
    } catch (error) {
        return next(error);
    }

    response.status(200).json({
        before: {
            totalHoursBreak: previousUserStats.totalHoursBreak,
        },
        after: {
            totalHoursBreak: userStats.totalHoursBreak,
        }
    });
});

module.exports = statsRouter;