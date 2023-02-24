import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import jwt from 'jwt-decode'
import { useNavigate ,Navigate,Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NavBar2 from '../NavBar/NavBar2';
export default function SGFollowers() {

  const params = useParams();
  const [creator, setcreator] = useState('')
  console.log(params.subgreddit)
  const[followers,setfollowers] = useState([])
  const GetFollowers = async () => {
    const res = await fetch('/api/sg/getfollowers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subGredditName: params.subgreddit,
      })
    })
    const data = await res.json()
    console.log(data)
    if (data.success) {
      setfollowers(data.followers)
    setcreator(data.creator)
    console.log(creator)
    }
    else {
      console.log(data)
    }
  }

  const BlockFollower = async (e) => {
    e.preventDefault();
    var currname = e.target.id
    var token = localStorage.getItem("token")
    var decoded = jwt(token)
    var username = decoded.username
    let res = await fetch('/api/blockfollower', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subGredditName: params.subgreddit,
        username: currname,
        currname: username
        
      })
    })
    let data = await res.json()
    if (data.success) {
      // localStorage.setItem("token", data.token)
      toast.success("Follower Blocked Successfully")
      console.log(data.followers)
      GetFollowers();
    }
    else {
console.log(data.error)
toast.error(data.error)

    }
  }
  const UnlockFollower = async (e) => {
    var token = localStorage.getItem("token")
    var decoded = jwt(token)
    var username = decoded.username
    e.preventDefault();
    var currname = e.target.id
    let res = await fetch('/api/unblockfollower', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subGredditName: params.subgreddit,
        username: currname,
        currname: username
      })
    })
    let data = await res.json()
    if (data.success) {
      // localStorage.setItem("token", data.token)
      toast.success("Follower UnBlocked Successfully")
      console.log(data.followers)
      GetFollowers();
    }
    else {

      toast.error(data.error)
    }
  }




  useEffect(() => {
    GetFollowers()
  }, [])

  

  return (
    <div>
      <NavBar2></NavBar2>
         <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />
      
    <div>{followers && followers.map((follow) => (
      <><div key={follow._id} display='none'>
          {(!follow.blocked ) &&  <div className="card-body my-3 mx-5 card container ">
              <h5 className="card-title">{follow.username}</h5>
              <div>
            {(!follow.blocked&& (follow.username!=creator) )&&  <button  onClick={BlockFollower} id = {follow.username} className="btn btn-success">Block Follower</button>}
            {(follow.blocked&& (follow.username!=creator) )&&  <button  onClick={UnlockFollower} id = {follow.username} className="btn btn-danger">UnBlock Follower</button>}
              </div>
          </div>}
      </div></>))}
      
    </div>


   { <div>{followers && followers.map((follow) => (
      <div key={follow._id}>
         {(follow.blocked)&&  <div className="card-body my-3 mx-5 card container">
              <h5 className="card-title">{follow.username}  is Blocked</h5>
              <div>
            {(!follow.blocked&& (follow.username!=creator) )&& (jwt(localStorage.getItem('token')).username==creator) && <button  onClick={BlockFollower} id = {follow.username} className="btn btn-success">Block Follower</button>}
            {(follow.blocked&& (follow.username!=creator) )&& (jwt(localStorage.getItem('token')).username==creator) && <button  onClick={UnlockFollower} id = {follow.username} className="btn btn-danger">UnBlock Follower</button>}
              </div>
          </div>}
      </div>))}
      
    </div>}

      </div>
  )
}
