import Settings from "./Settings";
import Timer from "./Timer";
import { useState, useEffect } from "react";
import SettingsContext from "./SettingsContext";
import Experience from "./Experience";
import userService from "../services/user";

const Main = ({ loggedUser }) => {
    const [user, setUser] = useState(loggedUser);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [workMinutes, setWorkMinutes] = useState(45);
    const [workSeconds, setWorkSeconds] = useState(0);
    const [breakMinutes, setBreakMinutes] = useState(15);
    const [breakSeconds, setBreakSeconds] = useState(0);
    
    useEffect(() => {
            setInterval(async () => {
                const updatedUser = await userService.getUser(user);
                setUser(updatedUser);
            }, 60000);
        },
    []);
    
    console.log(user);

    return (
        <main>
            <SettingsContext.Provider value={{
                workMinutes,
                workSeconds,
                breakMinutes,
                breakSeconds,
                setWorkMinutes,
                setWorkSeconds,
                setBreakMinutes,
                setBreakSeconds,
                settingsVisible,
                setSettingsVisible,
            }}>
            <Experience user={user}/>
                {settingsVisible ? <Settings/> : <Timer user={user}/>}
            </SettingsContext.Provider>
        </main>
    )
}

export default Main;