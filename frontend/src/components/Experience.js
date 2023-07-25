import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import userService from "../services/user";

const Experience = ({ loggedUser }) => {
    const [user, setUser] = useState(loggedUser);
    console.log(user);
    useEffect(() => {
        (async () => {
            const updatedUser = await userService.getUser(user);
            setUser(updatedUser);
        })();
        setInterval(async () => {
            const updatedUser = await userService.getUser(user);
            setUser(updatedUser);
        }, 60000);
    },
    []);

    return (
        <>
        {user.experience &&
            <div>
                Level: {user.experience.level} 
                <ProgressBar bgcolour={"green"} 
                    current={user.experience.currentXp} 
                    required={user.experience.requiredXp}
                />
            </div>
        }
        </>
    )
};

export default Experience;