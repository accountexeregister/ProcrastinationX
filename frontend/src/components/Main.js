import Settings from "./Settings";
import Stats from "./Stats";
import Timer from "./Timer";
import { useState, useEffect } from "react";
import SettingsContext from "./SettingsContext";
import Experience from "./Experience";
import userService from "../services/user";

const Main = ({ loggedUser }) => {
    const [user, setUser] = useState(loggedUser);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [statsVisible, setStatsVisible] = useState(false);
    const [workMinutes, setWorkMinutes] = useState(user.settings.workMinutes);
    const [workSeconds, setWorkSeconds] = useState(user.settings.workSeconds);
    const [breakMinutes, setBreakMinutes] = useState(user.settings.breakMinutes);
    const [breakSeconds, setBreakSeconds] = useState(user.settings.breakSeconds);
    
    // Updates settings after returning to main menu
    const updateSettings = async (workMinutes, workSeconds, breakMinutes, breakSeconds) => {
        const settings = {
            workMinutes,
            workSeconds,
            breakMinutes,
            breakSeconds
        };
        await userService.updateSettings(user, settings);
        setSettingsVisible(false);
    }

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
                updateSettings,
                setStatsVisible
            }}>
            <Experience loggedUser={user}/>
                {settingsVisible ? <Settings/> : statsVisible ? <Stats user={user}/> : <Timer user={user}/>}
            </SettingsContext.Provider>
        </main>
    )
}

export default Main;