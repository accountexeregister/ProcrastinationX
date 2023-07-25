import ProgressBar from "./ProgressBar";

const Experience = ({ user }) => {
    return (
        <div>
            Level: 1 <ProgressBar bgcolour={"green"} completed={50}/>
        </div>
    )
};

export default Experience;