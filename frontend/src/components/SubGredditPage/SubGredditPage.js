import React, { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import jwt from 'jwt-decode'
import { useParams, useNavigate ,Link} from 'react-router-dom';
import NavBar2 from '../NavBar/NavBar2';

const SubGredditPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  let token = localStorage.getItem("token")
    let decoded = jwt(token)
    let username = decoded.username
// console.log(params.subgreddit)
  const [subGredditPage,  setsubGredditPage] = useState()
const [postTitle , setpostTitle] = useState('')
const [postBody , setpostBody] = useState('')
const [posts, setposts] = useState()
const [user, setUser] = useState(username)
const [followed, setfollowed] = useState([])
const [report , setreport] = useState(false)
const [checker,setchecker] = useState(false)

const Report = async (e) => {
  
  navigate(`/report/${params.subgreddit}/${e.target.id}`)


}

const Getfollowings = async () => {
  let token = localStorage.getItem("token")
    let decoded = jwt(token)
    let currname = decoded.username
    if(subGredditPage){
      if(subGredditPage.subGredditCreator === currname){
        setchecker(r=>true)
        
      }
    }
    else 
    {
      setchecker(false)
    }

  let res = await fetch('/api/getfollowings', {
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
  const GetSubGredditPage = async () => {
    const res = await fetch('/api/getsubgredditpage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subGredditName: params.subgreddit
      })
    })
    
    const x = await res.json()
    console.log(x.SubGreddit.subGredditCreator+'sdfa')
    setsubGredditPage(per=>x.SubGreddit)
    let token = localStorage.getItem("token")
    let decoded = jwt(token)
    let currname = decoded.username
    if(x.SubGreddit){
      if(x.SubGreddit.subGredditCreator === currname){
        console.log('true')
        setchecker(r=>true)
      }
    }
    else 
    {
      setchecker(false)
    }

  }
  useEffect(() => {
    GetSubGredditPage();
    GetPosts();
    Getfollowings();
    console.log(checker)
   
  }, [checker])

const GTfollowers = async (e) => {
    e.preventDefault()

navigate(`/followers/${e.target.id}`)
  }
const GTPending = async (e) => {
    e.preventDefault()

navigate(`/pending/${e.target.id}`)

  }
  const SavePost = async (e) => {
    e.preventDefault()
    let token = localStorage.getItem("token")
    let decoded = jwt(token)
    let username = decoded.username
    let res = await fetch('/api/savepost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        postID: e.target.id
      })
    })
    let data = await res.json()
    if(data.success){
      toast.success("Post Saved Successfully")
    }
    else{
      toast.error(data.error)
    }
  }
  
  const GetPosts = async (e) => {
    // e.preventDefault()
    let res = await fetch('/api/getposts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subGredditName: params.subgreddit
      })
    })
    let data = await res.json()
    console.log(data)
    if(data.success){
      // toast.success("Posts Fetched Successfully")
      setposts(data.posts)

    }
    // setsubGredditPage(per=>data.SubGreddit)
  }
  

const MakePost = async (e) => {
    e.preventDefault()
    let token = localStorage.getItem("token")
    let decoded = jwt(token)
    let username = decoded.username
    setUser(username)
    console.log({
      subGredditName: params.subgreddit,
      postTitle: postTitle,
      postBody: postBody,
      Username: user,
  })

    let res = await fetch('/api/makepost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            subGredditName: params.subgreddit,
            postTitle: postTitle,
            postBody: postBody,
            Username: username
        })
    })
    let data = await res.json()
    if (data.success) {
        // localStorage.setItem("token", data.token)
        toast.success("Post Made Successfully")
        GetPosts();
        setpostTitle('')
        setpostBody('')
        console.log(data)
        GetSubGredditPage();
    }
    else {
        // console.log(data.error)
        toast.error("Error Occured")
    }
}
const UpVote = async (e) => {
    // e.preventDefault()
    let token = localStorage.getItem("token")
    let decoded = jwt(token)
    let username = decoded.username
    setUser(username)

    console.log(e.target.id)
    let res   = await fetch('/api/upvote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            postId: e.target.id,
            Username: username
        })  

    })
    let data = await res.json()
    if (data.success) {
        // localStorage.setItem("token", data.token)
        toast.success(data.message)
        GetPosts();
        console.log(data)
    }
    else {

        toast.error("Error Occured")
    }
}
// write downvote function
const DownVote = async (e) => {
    // e.preventDefault()
    let token = localStorage.getItem("token")
    let decoded = jwt(token)
    let username = decoded.username
    setUser(username)
    let res   = await fetch('/api/downvote', {
        method: 'POST',
        headers: {

            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            postId: e.target.id,
            Username: username
        })
    })
    let data = await res.json()
    if (data.success) {
        // localStorage.setItem("token", data.token)
        toast.success(data.message)
        GetPosts();
        console.log(data)
    }
    else {
      toast.error("Error Occured")
    }
}
      
    const FollowUser = async (usernameToFollow) => {
      let token = localStorage.getItem("token")
      let decoded = jwt(token)
      let currname = decoded.username

      let res = await fetch('/api/followuser', {
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

    let token = localStorage.getItem("token")
    let decoded = jwt(token)
    let currname = decoded.username
      let res = await fetch('/api/unfollowuser', {
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





  return  (
<div >
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
  <div >
    {/* <button  onClick={GetPosts}>sfdasfasdf</button> */}
        <div className="modal fade" id="modalRegisterForm" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">Make a new Post</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body mx-3">
               
                <div className="md-form mb-4">
                  <i className="fas fa-lock prefix grey-text" />
                  <input type="text" id="tags" value={postTitle} onChange={(e)=>setpostTitle(e.target.value)} className="form-control validate" />
                  <label data-error="wrong" data-success="right" htmlFor="orangeForm-pass">Title</label>
                </div>
                <div className="md-form mb-4">
                  <i className="fas fa-lock prefix grey-text" />
                  <input type="text" id="bannedwords" value={postBody} onChange={(e)=>setpostBody(e.target.value)} className="form-control validate" />
                  <label data-error="wrong" data-success="right" htmlFor="orangeForm-pass">Content</label>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button  onClick={MakePost} data-dismiss="modal" aria-label="Close" className="btn btn-deep-orange">Post</button>
              </div>
            </div>
          </div>
        </div>
        
        </div>
    <main className="profile-page">
      <section className="relative block h-500-px">
        <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")'}}>
          <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black" />
        </div>
        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{transform: 'translateZ(0px)'}}>
          <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x={0} y={0}>
            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-left">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-left">
                  <div className="relative">
                    <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" className="  align-left  absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <a href className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"data-toggle="modal" data-target="#modalRegisterForm" type='button' >
                      Create Post
                    </a>
                  </div>
                </div>
               
              </div>
              <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600"><Link id= {subGredditPage&&subGredditPage.subGredditName}onClick={GTfollowers} >{subGredditPage&& subGredditPage.subGredditnumfollowers}</Link ></span><span className="text-sm text-blueGray-400">Followers</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{subGredditPage&& subGredditPage.subGredditnumposts}</span><span className="text-sm text-blueGray-400">Posts</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{subGredditPage&& subGredditPage.subGredditnumPendingFollowers}</span><span className="text-sm text-blueGray-400">Requests</span>
                    </div>
                  </div>
                </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {subGredditPage&& subGredditPage.subGredditName}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas  mr-2 text-lg text-blueGray-400" />
                  Created by {subGredditPage&& subGredditPage.subGredditCreator}
                </div>
              
                <div className="mb-2 text-blueGray-600">
                  <i className="fas  mr-2 text-lg text-blueGray-400" /> BannedWords : { subGredditPage&&subGredditPage.subGredditBannedWords.map((bannedWord ) => (<div className="chip" data-mdb-close="true" >{bannedWord.bannedWord} </div>))}
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas  mr-2 text-lg text-blueGray-400" /> Tags : { subGredditPage&&subGredditPage.subGredditTags.map((bannedWord) => (<div className="chip" data-mdb-close="true" >{bannedWord.tag} </div>))}
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                    {subGredditPage&& subGredditPage.subGredditDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

   {  posts?    <div className='container' >
                {posts && posts.map((follow) => (
                    <div key={follow._id} >
                        <div className="card-body my-6 mx-5 card">
                         
                            {((!(followed.includes(follow.postCreator)))?<span>   <h6 className="card-subtitle mb-2 text-muted">{(!subGredditPage.subGredditBlockedUsers.includes(follow.postCreator))? follow.postCreator: (!(checker))? "blocked user": follow.postCreator }</h6><button onClick={() => {FollowUser(follow.postCreator);}} className="btn btn-success">Follow</button></span> : (<span>   <h6 className="card-subtitle mb-2 text-muted">{(subGredditPage.subGredditBlockedUsers.includes(follow.postCreator) && !(checker))? "blocked User":follow.postCreator}</h6><button onClick={() => {UnfollowUser(follow.postCreator)}} className="btn btn-danger">Unfollow</button></span>))}
                           
                           <span> <h5 className="card-title">{follow.postTitle}</h5>
                           <button id = {follow._id} onClick={SavePost} className="btn btn-info">Save</button>
                          </span>
                            <p className="card-text">{follow.postContent}</p>
                            <Link id={follow._id} onClick={UpVote}><i id={follow._id}  className ={`${follow.postUpvotes.includes(user)? "fas fa-angle-double-up" :"fas fa-angle-up"}`} ></i></Link><h6>{follow.postUpvotes.length}</h6>
                            <Link id={follow._id} onClick={DownVote}><i id={follow._id}   className ={`${follow.postDownvotes.includes(user)? "fas fa-angle-double-down" :"fas fa-angle-down"}`}></i></Link><h6>{follow.postDownvotes.length}</h6>

                           <span><button id={follow._id} onClick={Report} className="btn btn-danger">Report</button> </span> 
                            

                        </div>
                    </div>))}
            </div> :
            <div></div>
}

        <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                
              </div>
            </div>
          </div>
        </footer>
      </section>
    </main>
    </div>
  );
}

export default SubGredditPage