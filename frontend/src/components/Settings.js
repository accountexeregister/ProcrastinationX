import ReactSlider from "react-slider";
import "../css-components/slider.css";
import { useContext } from "react";
import SettingsContext from "./SettingsContext";
import BackButton from "./BackButton";

const Settings = () => {
    const settings = useContext(SettingsContext);
    const settingsWorkSeconds = settings.workSeconds < 10 ? "0" + settings.workSeconds : settings.workSeconds; 
    const settingsBreakSeconds = settings.breakSeconds < 10 ? "0" + settings.breakSeconds : settings.breakSeconds; 
    return (
        <div style={{textAlign: "left"}}>
            <label>work minutes: {settings.workMinutes}:{settingsWorkSeconds}</label>
            <ReactSlider
                className={"slider"}
                thumbClassName={"thumb"}
                trackClassName={"track"}
                value={settings.workMinutes}
                onChange={newVal => settings.setWorkMinutes(newVal)}
                min={0}
                max={120}
            />
            <ReactSlider
                className={"slider"}
                thumbClassName={"thumb"}
                trackClassName={"track"}
                value={settings.workSeconds}
                onChange={newVal => settings.setWorkSeconds(newVal)}
                min={0}
                max={59}
            />
            <label>break minutes: {settings.breakMinutes}:{settingsBreakSeconds}</label>
            <ReactSlider
                className={"slider green"}
                thumbClassName={"thumb"}
                trackClassName={"track"}
                value={settings.breakMinutes}
                onChange={newVal => settings.setBreakMinutes(newVal)}
                min={0}
                max={120}
            />
            <ReactSlider
                className={"slider green"}
                thumbClassName={"thumb"}
                trackClassName={"track"}
                value={settings.breakSeconds}
                onChange={newVal => settings.setBreakSeconds(newVal)}
                min={0}
                max={59}
            />
            <div style={{textAlign: "center", marginTop: "20px"}}>
                <BackButton onClick={async () => await settings.updateSettings(
                    settings.workMinutes,
                    settings.workSeconds,
                    settings.breakMinutes,
                    settings.breakSeconds
                )}/>
            </div>
        </div>
    )
}

export default Settings;