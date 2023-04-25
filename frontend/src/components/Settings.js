import ReactSlider from "react-slider";
import "../css-components/slider.css";
import { useContext } from "react";
import SettingsContext from "./SettingsContext";
import BackButton from "./BackButton";

const Settings = () => {
    const settings = useContext(SettingsContext);
    return (
        <div style={{textAlign: "left"}}>
            <label>work minutes: {settings.workMinutes}:00</label>
            <ReactSlider
                className={"slider"}
                thumbClassName={"thumb"}
                trackClassName={"track"}
                value={settings.workMinutes}
                onChange={newVal => settings.setWorkMinutes(newVal)}
                min={1}
                max={120}
            />
            <label>break minutes: {settings.breakMinutes}:00</label>
            <ReactSlider
                className={"slider green"}
                thumbClassName={"thumb"}
                trackClassName={"track"}
                value={settings.breakMinutes}
                onChange={newVal => settings.setBreakMinutes(newVal)}
                min={1}
                max={120}
            />
            <div style={{textAlign: "center", marginTop: "20px"}}>
                <BackButton onClick={() => settings.setSettingsVisible(false)}/>
            </div>
        </div>
    )
}

export default Settings;