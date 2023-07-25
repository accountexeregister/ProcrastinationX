import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main';
import Logout from './components/Logout';

const App = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedProcXUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  if (isLogin) {
    return <Login setUser={setUser} setIsLogin={setIsLogin}/>;
  } else if (isRegister) {
    return <Register setIsRegister={setIsRegister}/>;
  } else {
    return (
      <>
      {user && <div>Logged in as {user.username}</div>}
      {user && <Logout setUser={setUser}/>}
      <Main />
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
