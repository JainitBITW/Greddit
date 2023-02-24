import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import jwt from 'jwt-decode'
import { useNavigate ,Navigate,Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
export default function Pending() {
    const params = useParams();
    const [followers, setfollowers] = useState([])
    const GPFollowers = async () => {
        const res = await fetch('/api/getpending', {
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
            setfollowers(data.SubGreddit)
            // console.log(followers +'followers')
        }
        else {
            console.log(data)
        }
    }
    useEffect(() => {
        GPFollowers();
    }, [])
    
const APending = async (e) => {
    e.preventDefault();
    var currname = e.target.id
    let res = await fetch('/api/acceptpending', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            subGredditName: params.subgreddit,
            username: currname
        })
    })
    let data = await res.json()
    if (data.success) {
        // localStorage.setItem("token", data.token)
        toast.success("Follower Accepted Successfully")
        console.log(data.followers)
        GPFollowers();
    }
    else {
        console.log(data.error)
        toast.error("Error Occured")
    }
}

const DPending = async (e) => {
    e.preventDefault();
    var currname = e.target.id
    let res = await fetch('/api/delpending', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            subGredditName: params.subgreddit,
            username: currname
        })
    })
    let data = await res.json()
    if (data.success) {
        // localStorage.setItem("token", data.token)
        toast.success("Follower Deleted Successfully")

        GPFollowers();
    }
    else {
        console.log(data.error)
        toast.error("Error Occured")
    }
}


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
     <div>{ followers && followers.map((follow) => (

        <div kwy = {follow._id}>
              <div className="card-body my-3 mx-5 ">
                <h5 className="card-title">{follow.username}</h5>
                <div>
                <button onClick={APending} id = {follow.username} className="btn btn-success">Accept</button>   </div>
                <div>
                <button onClick={DPending} id = {follow.username} className="btn btn-danger">dECLINE</button>   </div>
            </div>
        </div>))}
        {(followers.length==0) && <div className="card-body my-3 mx-5 "> <h2 className="card-title">No Pending Requests Go do marketing</h2></div>}
        
      </div></div>
  )
}
