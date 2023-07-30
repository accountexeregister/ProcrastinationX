import userService from "../services/user";
import BackButton from "./BackButton";
import SettingsContext from "./SettingsContext";
import { useContext } from "react";

const Stats = ({ user }) => {
    const settings = useContext(SettingsContext);
    const { secondsWorked, secondsBreak, totalXp } = userService.getStats(user);
    return (
        <div>
            <div style={{textAlign: "center", marginTop: "20px"}}>
                Seconds worked: {secondsWorked}
            </div>
            <div style={{textAlign: "center", marginTop: "20px"}}>
                Seconds break: {secondsBreak}
            </div>
            <div style={{textAlign: "center", marginTop: "20px"}}>
                Total xp gained: {totalXp}
            </div>
            <div style={{textAlign: "center", marginTop: "20px"}}>
                <BackButton onClick={() => settings.setStatsVisible(false)}/>
            </div>
        </div>
    )
}

export default Stats;