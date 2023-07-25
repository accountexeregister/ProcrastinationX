import Settings from "./Settings";
import Timer from "./Timer";
import { useState } from "react";
import SettingsContext from "./SettingsContext";

const Main = ({user}) => {

    const [settingsVisible, setSettingsVisible] = useState(false);
    const [workMinutes, setWorkMinutes] = useState(45);
    const [workSeconds, setWorkSeconds] = useState(0);
    const [breakMinutes, setBreakMinutes] = useState(15);
    const [breakSeconds, setBreakSeconds] = useState(0);
    
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
                {settingsVisible ? <Settings/> : <Timer user={user}/>}
            </SettingsContext.Provider>
        </main>
    )
}

export default Main;