import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import jwt from 'jwt-decode'
import { useNavigate ,Navigate,Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
export default function SGFollowers() {

  const params = useParams();
  const [creator, setcreator] = useState('')
  console.log(params.sg)
  const[followers,setfollowers] = useState([])
  const GetFollowers = async () => {
    const res = await fetch('/api/sg/getfollowers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subGredditName: params.sg,
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
    let res = await fetch('/api/blockfollower', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subGredditName: params.sg,
        username: currname
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
      toast.error("Error Occured")
    }
  }
  const UnlockFollower = async (e) => {
    e.preventDefault();
    var currname = e.target.id
    let res = await fetch('/api/unblockfollower', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subGredditName: params.sg,
        username: currname
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

      toast.error("Error Occured")
    }
  }




  useEffect(() => {
    GetFollowers()
  }, [])

  

  return (
    <div>
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
      <div key={follow._id}>
          {!follow.blocked &&  <div className="card-body my-3 mx-5 ">
              <h5 className="card-title">{follow.username}</h5>
              <div>
            {(!follow.blocked )&&  <button  onClick={BlockFollower} id = {follow.username} className="btn btn-success">Block Follower</button>}
            {(follow.blocked )&&  <button  onClick={UnlockFollower} id = {follow.username} className="btn btn-danger">UnBlock Follower</button>}
              </div>
          </div>}
      </div>))}
      
    </div>


   { <div>{followers && followers.map((follow) => (
      <div key={follow._id}>
         {follow.blocked&&  <div className="card-body my-3 mx-5 ">
              <h5 className="card-title">{follow.username}</h5>
              <div>
            {(!follow.blocked )&&  <button  onClick={BlockFollower} id = {follow.username} className="btn btn-success">Block Follower</button>}
            {(follow.blocked )&&  <button  onClick={UnlockFollower} id = {follow.username} className="btn btn-danger">UnBlock Follower</button>}
              </div>
          </div>}
      </div>))}
      
    </div>}

      </div>
  )
}
