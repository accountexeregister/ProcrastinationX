import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PauseButton from './PauseButton';
import PlayButton from './PlayButton';

const Timer = () => {
    return (
        <div>
            <CircularProgressbar value={50} text={"50%"}/>;
            <div style={{marginTop: "20px;"}}>
                <PlayButton />
                <PauseButton />
            </div>
        </div>
    )
}

export default Timer;