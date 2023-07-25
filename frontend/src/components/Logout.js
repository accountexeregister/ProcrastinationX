import logoutService from "../services/logout";

const Logout = ({ setUser }) => {
    return (
        <button onClick={async () => {
            await logoutService.logout();
            window.localStorage.removeItem("loggedProcXUser")
            setUser(null);
        }}>Logout</button>
    )
};

export default Logout;