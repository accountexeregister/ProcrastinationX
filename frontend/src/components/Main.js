import Settings from "./Settings";
import Timer from "./Timer";
import { useState } from "react";
import SettingsContext from "./SettingsContext";

const Main = () => {

    const [settingsVisible, setSettingsVisible] = useState(false);
    const [workMinutes, setWorkMinutes] = useState(45);
    const [breakMinutes, setBreakMinutes] = useState(15);

    return (
        <main>
            <SettingsContext.Provider value={{
                workMinutes,
                breakMinutes,
                setWorkMinutes,
                setBreakMinutes,
                settingsVisible,
                setSettingsVisible,
            }}>
                {settingsVisible ? <Settings/> : <Timer/>}
            </SettingsContext.Provider>
        </main>
    )
}

export default Main;