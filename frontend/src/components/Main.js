import Settings from "./Settings";
import Timer from "./Timer";
import { useState } from "react";

const Main = () => {

    const [settingsVisible, setSettingsVisible] = useState(true);
    return (
        <main>
            {settingsVisible ? <Settings/> : <Timer/>}
        </main>
    )
}

export default Main;