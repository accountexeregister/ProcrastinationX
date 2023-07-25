import ProgressBar from "./ProgressBar";

const Experience = ({ user }) => {
    return (
        <div>
        <div>Level: 1</div>
        <ProgressBar bgcolour={"green"} completed={50}/>
        </div>
    )
};

export default Experience;