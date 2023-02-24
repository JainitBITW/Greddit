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
import Following from './components/Followers/Following';
import MySubgreddits from './components/MySubgreddits/MySubgreddits';
import SubGredditPage from './components/SubGredditPage/SubGredditPage';
import AllSubgreddits from './components/AllSubgreddit/AllSubgreddits';
import SGFollowers from './components/SGfollowers/SGFollowers';
import Pending from './components/Pending/Pending';
import Report from './components/report/Report';
import Reports from './components/Reports/Reports';
import SavedPosts from './components/savedposts/SavedPosts';
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

      <div>
        <Routes>
          <Route
            exact path="/login" element={<Auth></Auth>} ></Route>
          <Route exact path="/profile" element={<Profile></Profile>} ></Route>
          <Route exact path="/" element={<Home />} ></Route>
          <Route exact path="*" element={<div>Page not found</div>} ></Route>
          <Route exact path="/profile/allusers" element={<AllUsers></AllUsers>}></Route>
          <Route exact path="/profile/followers" element={<Followers></Followers>}></Route>
          <Route exact path="/profile/following" element={<Following></Following>}></Route>
          <Route exact path="/profile/mysubgreddits" element={<MySubgreddits></MySubgreddits>}></Route>
          <Route exact path="/subgreddit/:subgreddit" element={<SubGredditPage></SubGredditPage>}></Route>
          <Route exact path="/allsubgreddits" element={<AllSubgreddits></AllSubgreddits>}></Route>
          <Route exact path="/followers/:subgreddit"  element={<SGFollowers></SGFollowers>}></Route>
          <Route exact path="/pending/:subgreddit"  element={<Pending></Pending>}></Route>
          <Route exact path="/report/:subgreddit/:id"  element={<Report></Report>}></Route>
          <Route exact path="/reports/:subgreddit" element={<Reports></Reports>}></Route>
          <Route exact path="/savedposts" element={<SavedPosts></SavedPosts>}></Route>

        </Routes>
      </div>

    </>
  );
}

export default App;
