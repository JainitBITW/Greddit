import React from 'react'
import WithAuth from '../WithAuth/WithAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import jwt from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify';
import { createRoot } from 'react-dom/client'
export default function Followers() {

    const [followers, setFollowers] = useState([])
    const Getabcd = async () => {

        var token = localStorage.getItem("token")
        var currname = jwt(token).username

        console.log(currname)
        let res = await fetch('/api/getfollowers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentUser: currname
            })
        })
        let data = await res.json()
        setFollowers(data.Followers)
        // console.log(followers)

    }
    useEffect(() => {
        Getabcd();
 

    }, [])

    const RemoveFollower = async (remove) => {
        // e.preventDefault();
        console.log('sdfasdf')
        var token = localStorage.getItem("token")
        var currname = jwt(token).username
        let res = await fetch('/api/removefollower', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentUser: currname,
                follower: remove
            })
        })
        let data = await res.json()
        if (data.success) {
            localStorage.setItem("token", data.token)
            toast.success("Follower Removed Successfully")
            Getabcd();
        }
        else {
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
            <div>
                {followers.map((follow) => (
                    <div key={follow} >
                        <div className="card-body my-3 mx-5">
                            <h5 className="card-title">{follow}</h5>
                            <p className="card-text">{follow}</p>
                            <button onClick={()=>RemoveFollower(follow)} className="btn btn-info">Restrict Follower</button>
                        </div>
                    </div>))}
            </div> 
        </div>
    )
}
