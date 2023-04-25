import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';

const Timer = () => {
    return (
        <div>
            <CircularProgressbar value={50} text={"50%"}/>;
            <div>
                <PlayButton />
            </div>
        </div>
    )
}

export default Timer;