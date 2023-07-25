import ProgressBar from "./ProgressBar";

const Experience = ({ user }) => {
    return (
        <div>
            Level: {user.experience.level} 
            <ProgressBar bgcolour={"green"} 
                current={user.experience.currentXp} 
                required={user.experience.requiredXp}
            />
        </div>
    )
};

export default Experience;