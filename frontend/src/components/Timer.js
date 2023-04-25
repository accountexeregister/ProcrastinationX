import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PauseButton from './PauseButton';
import PlayButton from './PlayButton';
import SettingsButton from './SettingsButton';
import { useContext } from 'react';
import SettingsContext from './SettingsContext';

const Timer = () => {
    const settings = useContext(SettingsContext);
    return (
        <div>
            <CircularProgressbar value={50} text={"50%"}/>;
            <div style={{marginTop: "20px;"}}>
                <PlayButton />
                <PauseButton />
            </div>
            <div style={{marginTop: "20px"}}>
                <SettingsButton onClick={() => settings.setSettingsVisible(true)}/>
            </div>
        </div>
    )
}

export default Timer;