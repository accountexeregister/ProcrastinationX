import userService from "../services/user";
import BackButton from "./BackButton";
import SettingsContext from "./SettingsContext";
import { useState, useContext, useEffect } from "react";

const Stats = ({ user }) => {
    const [workSeconds, setWorkSeconds] = useState(0);
    const [breakSeconds, setBreakSeconds] = useState(0);
    const [xp, setXp] = useState(0);
    
    const settings = useContext(SettingsContext);
    useEffect(() => {
        (async () => {
            const stats = await userService.getStats(user);
            console.log(stats);
            setWorkSeconds(stats.totalSecondsWorked);
            setBreakSeconds(stats.totalSecondsBreak);
            setXp(stats.totalXp);
        })();
    }, [])
    return (
        <div>
            <div style={{textAlign: "center", marginTop: "20px"}}>
                Seconds worked: {workSeconds}
            </div>
            <div style={{textAlign: "center", marginTop: "20px"}}>
                Seconds break: {breakSeconds}
            </div>
            <div style={{textAlign: "center", marginTop: "20px"}}>
                Total xp gained: {xp}
            </div>
            <div style={{textAlign: "center", marginTop: "20px"}}>
                <BackButton onClick={() => settings.setStatsVisible(false)}/>
            </div>
        </div>
    )
}

export default Stats;