import React from 'react'
import { useState, useEffect } from "react";
import jwt from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify';


function AllUsers() {
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
    useEffect(() => {
        GetAllUsers()
        Getfollowings()
    }, [])

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
  

    const FollowUser = async (usernameToFollow) => {


        let res = await fetch('http://localhost:4000/api/followuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usernameToFollow: usernameToFollow,
                currentUser: currname,
                Following: followed

            })
        })
        let x = await res.json()
        console.log(x)
        if (x.success) {
            toast.success("Followed ", usernameToFollow)
            
            localStorage.setItem('token', x.token)
            Getfollowings();

            console.log(followed)

           
        }
        else {
            toast.error(x.error)
        }

    }
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
            var string  = 'Unfollowed '+usernameToUnfollow 
            toast.success(string)
            localStorage.setItem("token",x.token)
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
            <div key={UserName._id} style={{ display: (currname === UserName.username) ? 'none' : 'block' }} className=" my-3 card w-75">
                <div className="card-body my-3">
                    <h5 className="card-title">{UserName.username}</h5>
                    <p className="card-text">{UserName.username}</p>
                    {(!(followed.includes(UserName.username))?<button onClick={() => {FollowUser(UserName.username); console.log(followed)}} className="btn btn-info">Follow</button> : (<button onClick={() => {UnfollowUser(UserName.username)}} className="btn btn-info">Unfollow</button>))}
              
                </div>
            </div>
        ))}
    </div>)
}

export default AllUsers;