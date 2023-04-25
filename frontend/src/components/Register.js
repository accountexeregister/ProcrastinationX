import { useState } from "react";
import LoginNotification from "../Notifications/LoginNotification";
import registerService from "../services/register";

const Register = ({ setIsRegister }) => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    const setErrorMessage = (message) => {
        if (message !== null) {
          setMessage(message);
          setError(true);
        } else {
          setMessage(null);
          setError(false);
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault()
        
        try {
          const user = await registerService.register({
            username, name, password,
          });
          setUsername('');
          setName("");
          setPassword('');

        } catch (exception) {
          setErrorMessage('Invalid registration');
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        }
    }

    return (
        <>  
            <LoginNotification message={message} error={error}/>
            <div>REGISTER</div>
            <form onSubmit={handleRegister}>
            <div>
            username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
            />
            </div>
            <div>
            name
                <input
                type="text"
                value={name}
                name="Name"
                onChange={({ target }) => setName(target.value)}
            />
            </div>
            <div>
            password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
            </div>
            <button type="submit">Register</button>
            </form>
            <button onClick={() => setIsRegister(false)}>
                Back
            </button>
        </>
    )
}

export default Register;