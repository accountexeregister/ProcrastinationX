import loginService from "../services/login";
import { useState } from "react";
import LoginNotification from "../Notifications/LoginNotification";

const Login = ({ setUser }) => {
    const [username, setUsername] = useState("");
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

    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
          const user = await loginService.login({
            username, password,
          });
          window.localStorage.setItem(
            "loggedProcXUser", JSON.stringify(user)
          );
          setUser(user);
          setUsername('');
          setPassword('');

        } catch (exception) {
          setErrorMessage('Wrong credentials');
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        }
    }
    return (
        <>  
            <LoginNotification message={message} error={error}/>
            <div>LOGIN</div>
            <form onSubmit={handleLogin}>
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
            password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
            </div>
            <button type="submit">login</button>
            </form>
        </>
    )
}

export default Login;