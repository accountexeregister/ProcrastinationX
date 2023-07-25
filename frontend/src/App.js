import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';
import Logout from './components/Logout';
import userService from "./services/user";


const App = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const setUserFromDb = async (userJSON) => {
    let user = JSON.parse(userJSON);
    user = await userService.getUser(user);
    setUser(user);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedProcXUser");
    if (loggedUserJSON) {
      (async () => await setUserFromDb(loggedUserJSON))();
    }
  }, []);

  if (isLogin) {
    return <Login setUser={setUser} setIsLogin={setIsLogin} setUserFromDb={setUserFromDb}/>;
  } else if (isRegister) {
    return <Register setIsRegister={setIsRegister}/>;
  } else {
    return (
      <>
      {user && <div>Logged in as {user.username}</div>}
      {user && <Logout setUser={setUser}/>}
      {user && <Main loggedUser={user}/>}
      <button onClick={() => setIsLogin(true)}>
        Login
      </button>
      <button onClick={() => setIsRegister(true)}>
        Register
      </button>
      </>
    );
  }
}

export default App;
