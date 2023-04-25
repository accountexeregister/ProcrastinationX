import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PauseButton from './PauseButton';
import PlayButton from './PlayButton';
import SettingsButton from './SettingsButton';

const Timer = () => {
    return (
        <div>
            <CircularProgressbar value={50} text={"50%"}/>;
            <div style={{marginTop: "20px;"}}>
                <PlayButton />
                <PauseButton />
            </div>
            <div style={{marginTop: "20px"}}>
                <SettingsButton/>
            </div>
        </div>
    )
}

export default Timer;