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

    const RemoveFollower = async (e) => {
        e.preventDefault();
        var token = localStorage.getItem("token")
        var currname = jwt(token).username
        let res = await fetch('/api/removefollower', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentUser: currname,
                follower: e.target.value
            })
        })
        let data = await res.json()
        if (data.status === 200) {
            toast.success("Follower Removed Successfully")
            Getabcd();
        }
        else {
            toast.error("Error Occured")
        }
    }



    return (
        <div>
            <div>
                {followers.map((follow) => (
                    <div key={follow} >
                        <div className="card-body my-3 mx-5">
                            <h5 className="card-title">{follow}</h5>
                            <p className="card-text">{follow}</p>
                            <button  className="btn btn-info">Restrict Follower</button>
                        </div>
                    </div>))}
            </div> 
        </div>
    )
}
