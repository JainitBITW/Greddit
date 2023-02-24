import React from 'react'
import { useState, useEffect } from "react";
import jwt from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify';


function Following() {
    var token = localStorage.getItem("token")
    var currname = jwt(token).username
    const [users, setusers] = useState([])

    const [followed, setfollowed] = useState([])
    const GetAllUsers = async () => {
        var token = localStorage.getItem("token")
        
        console.log(currname)
        let res = await fetch('http://localhost:4000/api/allusers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let x = await res.json()
        setusers(x.AllUsers)
    }
    
    const Getfollowings = async () => {
        
        
        let res = await fetch('http://localhost:4000/api/getfollowings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: currname
            })
        })
        let x = await res.json()
        setfollowed(x.Following)
        
    }

    useEffect(() => {
        GetAllUsers();
        Getfollowings();
    }, [])
    
    

    const UnfollowUser = async (usernameToUnfollow) => {
        let res = await fetch('http://localhost:4000/api/unfollowuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usernameToUnfollow: usernameToUnfollow,
                currentUser: currname,
                Following: followed

            })
        })

        let x = await res.json()
        console.log(x)
        if (x.success) {
            toast.success("unFollowed User")
            localStorage.setItem("token", x.token)
            Getfollowings();
            console.log(followed)

        }
        else {
            toast.error(x.error)
        }
    }


    return (<div>
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
        {users.map((UserName) => (
            <div key={UserName._id} style={{ display: followed.includes(UserName.username) ?'block' : 'none' }} className=" my-3 card w-75">
                <div className="card-body my-3">
                    <h5 className="card-title">{UserName.username}</h5>
                    <p className="card-text">{UserName.username}</p>
                    <button onClick={() => UnfollowUser(UserName.username)} className="btn btn-primary">Unfollow</button>

                </div>
            </div>
        ))}
    </div>)
}

export default Following;