import React from 'react'
import WithAuth from '../WithAuth/WithAuth';
import { Navigate, useNavigate,Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import jwt from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify';
import { createRoot } from 'react-dom/client'
import MySubgreddits from '../MySubgreddits/MySubgreddits';
import NavBar from '../NavBar/NavBar';
const  AllSubgreddits=() =>{
    const navigate = useNavigate();
    const [allSubgreddits, setallSubgreddits] = useState()

    const GetSubgreddits = async () => {
        var token = localStorage.getItem('token')
        var UserName = jwt(token).username
        

        let res = await fetch('/api/allsubgreddits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: UserName
            })

                
        })
        let data = await res.json()
        setallSubgreddits(data.allSubgreddits)
        // console.log(followers)

    }
    useEffect(() => {
        GetSubgreddits()
        console.log(allSubgreddits)
    }, [])
    const GotoSubreddit =(e) =>{
        e.preventDefault();
        // var navigate = useNnavigate(`` );
      
      navigate(`/subgreddit/${e.target.id}` );
      }
const FollowSG = async (e) => {
    e.preventDefault()
    console.log(e.target.id +'asdfasdfasdf')
    var token = localStorage.getItem('token')
    var UserName = jwt(token).username
    var subGredditName = e.target.id
    const res = await fetch('/api/followsubgreddit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            subGredditName: subGredditName,
            UserName: UserName,
        })
    })
    const data = await res.json()
    console.log(data)
    if (data.success) {
        toast.success("Followed SubGreddit Successfully")
        GetSubgreddits();
        console.log(allSubgreddits)
        console.log(data.success)
    }
    else {
        toast.error(data.error)
        console.log(data)   
    }
}

    return (<div>
        <NavBar></NavBar>
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
            <MySubgreddits/>
        { allSubgreddits&& allSubgreddits.map((subGreddit) => (
            <div>
           <div key={subGreddit.subGredditName} className=" my-3 card w-75">
         <div className="card-body my-3">
                <Link onClick={GotoSubreddit}> <h5 className="card-title" id={subGreddit.subGredditName} >{subGreddit.subGredditName}</h5> </Link>
                  <p className="card-text">{subGreddit.subGredditDescription}</p>

                    <h6 className="card-title"> Number of Followers : {subGreddit.subGredditnumfollowers}</h6>
                    <h6 className="card-title"> Number of Posts : {subGreddit.subGredditnumposts}</h6>
                    <div>
                        BannedWords : {subGreddit.subGredditBannedWords.map((bannedWord) => (<div className="chip" data-mdb-close="true" >{bannedWord.bannedWord} </div>))}
                    </div>
                    <div>
                        Tags : {subGreddit.subGredditTags.map((bannedWord) => (<div className="chip" data-mdb-close="true" >{bannedWord.tag} </div>))}
                    </div>

                    <div className='py-2'> <button id={subGreddit.subGredditName} onClick={FollowSG} className="btn btn-info mx-2">Send Follow Request</button>


                         {/* {(!(followed.includes(UserName.username))?<button onClick={() => {FollowUser(UserName.username); console.log(followed)}} className="btn btn-info">Follow</button> : (<button onClick={() => {UnfollowUser(UserName.username)}} className="btn btn-info">Unfollow</button>))} */}
                     </div>
                 </div>
             </div>

        / </div>
        ))}
        </div>)


}
export default AllSubgreddits;