import SignUp from './components/SignUp/SignUp';
import './App.css';
import Login from './components/Login/Login';
import { Routes, BrowserRouter as Router, Link, Route, useNavigate, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Profile/Profile';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import WithAuth from './components/WithAuth/WithAuth';
import AllUsers from './components/allusers/AllUsers';
import Followers from './components/Followers/Followers';
function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  if (localStorage.getItem('token')) {
    
    return (<Navigate to="/profile"></Navigate>)
  }
  else if (location.search === '?mode=login') {
    return <Login></Login>
  }
  else if (location.search === '?mode=signup') {
    return <SignUp></SignUp>
  }

}
function Home() {
  if (localStorage.getItem('token') ){
    return (<Navigate to="/profile"></Navigate>)
  } else {
    return (<Navigate to="/login?mode=login"></Navigate>)
  }
}
function App() {



  return (

    <>
      <NavBar></NavBar>
      <div>
        <Routes>
          <Route
            exact path="/login" element={<Auth></Auth>} ></Route>
          <Route exact path="/profile" element={<Profile></Profile>} ></Route>
          <Route exact path="/" element={<Home />} ></Route>
          <Route exact path="*" element={<div>Page not found</div>} ></Route>
          <Route exact path="/profile/allusers" element={<AllUsers></AllUsers>}></Route>
          <Route exact path="/profile/followers" element={<Followers></Followers>}></Route>
          
        </Routes>
      </div>

    </>
  );
}

export default App;