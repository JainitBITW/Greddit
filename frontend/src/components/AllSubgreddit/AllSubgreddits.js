import React from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import jwt from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify';
import NavBar from '../NavBar/NavBar';
const  AllSubgreddits=() =>{
    const navigate = useNavigate();
    const [allSubgreddits, setallSubgreddits] = useState()
    const [sortorder, setsortorder] = useState("alpha");
   const sortalpha = (a, b) => {
        if (a.subGredditName < b.subGredditName) {
            return -1;
        }
        if (a.subGredditName > b.subGredditName) {
            return 1;
        } 
        return 0;
    }
   
    const sortfollowers = (a, b) => {

        if (a.subGredditnumfollowers > b.subGredditnumfollowers) {
            return -1;
        }
        if (a.subGredditnumfollowers < b.subGredditnumfollowers) {  
            return 1;
        }
        return 0;
    }
    const sortdate = (a, b) => {
     
        if (a.subGredditdate > b.subGredditdate) {
            return -1;
        }
        if (a.subGredditdate < b.subGredditdate) {
            return 1;
        }
        return 0;
    }
    const handlesort = (sub) => {

      if (sortorder === "alpha") {
        return sub.sort(sortalpha);
      }
      else if (sortorder === "followers") {
        return sub.sort(sortfollowers);
      }
      else if (sortorder === "date") {
        console.log(sortorder)
        return sub.sort(sortdate)
      }
      else
        return sub;
    }

    const handlesortval = (e) => {
      setsortorder(e.target.value);
      GetSubgreddits()
      handlesort(allSubgreddits)
      
    }

    
    
    const GetSubgreddits = async () => {
        var token = localStorage.getItem('token')
        var UserName = jwt(token).username
        

        let res = await fetch('http://localhost:4000/api/allsubgreddits', {
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
    const res = await fetch('http://localhost:4000/api/followsubgreddit', {
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
const deleteSubGreddit = async (subGredditId) => {
  const res = await fetch('http://localhost:4000/api/deletesubgreddit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({subGredditName : subGredditId })
  })
  const response = await res.json()
  console.log(response+'ffgsdg')
  if(response.success)
  {
    toast.success("SubGreddit Deleted Successfully")
    GetSubgreddits();
  }
  else
  {
    toast.error("SubGreddit Deletion Failed")
  }
}

const BlockFollower = async (e) => {
    e.preventDefault();
    var token = localStorage.getItem("token")
    var decoded = jwt(token)
    var currname = decoded.username
    let res = await fetch('http://localhost:4000/api/blockfollower', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subGredditName: e.target.id,
        username: currname,
        
      })
    })
    let data = await res.json()
    if (data.success) {
      // localStorage.setItem("token", data.token)
      toast.success("yOU LEFT SUCCESSFULLY BYE BYE")
    //   console.log(data.followers)
      GetSubgreddits();
    }
    else {
console.log(data.error)
toast.error(data.error)

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
            <select id="countries" onChange={handlesortval} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-10 w-4/12">
            <option value="alpha" selected>Alphabetically </option>
            <option value="followers">Number Followers </option>
            <option value="date">Creation Date</option>
          </select>
            
        { allSubgreddits&& handlesort(allSubgreddits).map((subGreddit) => (
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

                   
                     { (subGreddit.subGredditCreator) && <div className='py-2'> <button id={subGreddit.subGredditName} onClick={()=>deleteSubGreddit(subGreddit.subGredditName)} className="btn btn-info mx-2">Delete</button>
                     </div>}
                    {
                    (subGreddit.subGredditBlockedUsers.includes(jwt(localStorage.getItem('token')).username)) && <div className='py-2'>Sorry you cant join once you are blocked or you left </div>
                    }
                    
                    {
                    (subGreddit.subGredditPendingFollowers.includes(jwt(localStorage.getItem('token')).username)) && <div className='py-2'>Your Request to Join is pending</div>
                    }
                    {
                      ( ( !(subGreddit.subGredditPendingFollowers.includes(jwt(localStorage.getItem('token')).username)) && (!subGreddit.subGredditCreator))&& (!subGreddit.subGredditFollowers.includes(jwt(localStorage.getItem('token')).username))&& (!subGreddit.subGredditBlockedUsers.includes(jwt(localStorage.getItem('token')).username)) )&&
                      ( <div className='py-2'> <button id={subGreddit.subGredditName} onClick={FollowSG} className="btn btn-info mx-2">Join</button></div>)
                    }
    {
                        (subGreddit.subGredditFollowers.includes(jwt(localStorage.getItem('token')).username))&& (!subGreddit.subGredditCreator) && (<div className='py-2'> <button id={subGreddit.subGredditName} onClick={BlockFollower} className="btn btn-danger mx-2">Leave</button></div>)
                    }
                
                 </div>
             </div>

        / </div>
        ))}
        </div>)


}
export default AllSubgreddits;