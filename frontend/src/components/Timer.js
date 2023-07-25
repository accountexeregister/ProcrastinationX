import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PauseButton from './PauseButton';
import PlayButton from './PlayButton';
import SettingsButton from './SettingsButton';
import { useState, useEffect, useContext, useRef } from 'react';
import SettingsContext from './SettingsContext';
import userService from "../services/user";

const Timer = ({user}) => {
    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState("work"); // work/break/null
    const [timeLeft, setTimeLeft] = useState(0); // time in seconds
    const settings = useContext(SettingsContext);

    const timeElapsed = useRef(0);
    const timeLeftRef = useRef(timeLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    const startTimer = () => {
        timeLeftRef.current = (settings.workMinutes * 60) + settings.workSeconds;
        setTimeLeft(timeLeftRef.current);
    }

    const switchMode = () => {
        const nextMode = modeRef.current === "work" ? "break" : "work";
        const nextTime = nextMode === "work" 
        ? (settings.workMinutes * 60) + settings.workSeconds 
        : (settings.breakMinutes * 60) + settings.breakSeconds;
        setMode(nextMode);
        modeRef.current = nextMode;
        setTimeLeft(nextTime);
        timeLeftRef.current = nextTime;
    }

    const tick = () => {
        timeElapsed.current++;
        timeLeftRef.current--;
        setTimeLeft(timeLeftRef.current);
    }

    useEffect(() => {
        startTimer();
        const intervalFunc = setInterval(async () => {
            if (isPausedRef.current || timeElapsed.current >= 30000) {
                await userService.updateXp(user, timeElapsed.current / 1000);
                timeElapsed.current = 0;
                return;
            }

            if (timeLeftRef.current === 0) {
                await userService.updateXp(user, timeElapsed.current / 1000);
                timeElapsed.current = 0;
                return switchMode();
            }

            tick();
        }, 1000)
        return () => clearInterval(intervalFunc);
    }, [settings]);

    useEffect(() => {
        if (isPaused) {

        }
    }, [isPaused]);

    const totalTime = mode === "work" 
    ? (settings.workMinutes * 60) + settings.workSeconds 
    : (settings.breakMinutes * 60) + settings.breakSeconds; // in seconds
    const percentage = Math.round(timeLeft / totalTime * 100);

    const minutes = Math.floor(timeLeft / 60); // ex: 44.8 -> 44
    let seconds = timeLeft % 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return (
        <div>
            <CircularProgressbar 
                value={percentage} 
                text={`${minutes}:${seconds}`}
                styles={buildStyles({
                    // Colors
                    pathColor: mode === "work" ? "red" : "green",
                    textColor: mode === "work" ? "red" : "green",
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                })}
            />
            <div style={{marginTop: "20px"}}>
                {isPaused 
                ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }}/> 
                : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}
            </div>
            <div style={{marginTop: "20px"}}>
                <SettingsButton onClick={() => settings.setSettingsVisible(true)}/>
            </div>
        </div>
    )
}

export default Timer;