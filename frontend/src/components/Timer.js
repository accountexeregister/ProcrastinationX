import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Timer = () => {
    return (
        <div>
            <CircularProgressbar value={50} text={"50%"} />;
        </div>
    )
}

export default Timer;