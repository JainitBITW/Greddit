import React, { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import jwt from 'jwt-decode'
import { useNavigate ,Navigate,Link} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

export default function MySubgreddits() {
 
const [subGredditname, setsubGredditname] = useState('')
const [subGredditDescription, setsubGredditDescription] = useState('')
const [subGredditTags, setsubGredditTags] = useState('')
const [subGredditBannedWords, setsubGredditBannedWords] = useState('')
const [allSubgreddits , setallSubgreddits] = useState([])
const navigate = useNavigate();
const GotoSubreddit =(e) =>{
  e.preventDefault();
  // var navigate = useNnavigate(`` );

navigate(`/subgreddit/${e.target.id}` );
}
const CreateSubGreddit = async (e) => {
    // e.preventDefault()
    var token = localStorage.getItem('token')
   var  subGredditCreator = jwt(token).username
  //  var subGredditCreatorId = jwt(token).id
    const res = await fetch('/api/createsubgreddit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            subGredditName: subGredditname,
            subGredditDescription: subGredditDescription,
            subGredditTags: subGredditTags.trim(),
            subGredditBannedWords: subGredditBannedWords.trim(),
            subGredditCreator: subGredditCreator,
        })
    })
    const data = await res.json()
    console.log(data)
    if (data.success) {
      toast.success("SubGreddit Created Successfully")
      GetSubgreddits();
      console.log(allSubgreddits)
        console.log(data.success)
        setsubGredditname('')
        setsubGredditDescription('')
        setsubGredditTags('')
        setsubGredditBannedWords('')



    }
    else {
        console.log(data)
    }
}

const GetSubgreddits =async()=> 
{
  var token = localStorage.getItem('token')
   var  subGredditCreator = jwt(token).username
  const res = await fetch('/api/getmysubgreddits', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({username : subGredditCreator })
})
const response = await res.json()

setallSubgreddits(response.SubGreddits)
console.log(response.SubGreddits)
}
useEffect(() => {
  GetSubgreddits()
}, [])

const deleteSubGreddit = async (subGredditId) => {
  const res = await fetch('/api/deletesubgreddit', {
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


 
    return   (
      <div>
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
      <div>
        <div className="modal fade" id="modalRegisterForm" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">Make a new SubGreddit</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body mx-3">
                <div className="md-form mb-5">
                  <i className="fas fa-user prefix grey-text" />
                  <input type="text" id="subGredditname" value={subGredditname} onChange={(e)=>setsubGredditname(e.target.value)} className="form-control validate" />
                  <label data-error="wrong" data-success="right" htmlFor="orangeForm-name">SubGreddit name</label>
                </div>
                <div className="md-form mb-5">
                  <i className="fas fa-envelope prefix grey-text" />
                  <input type="text" id="subGredditDescription" value= {subGredditDescription} onChange={(e)=> setsubGredditDescription(e.target.value)} className="form-control validate" />
                  <label data-error="wrong" data-success="right" htmlFor="orangeForm-email">SubGreddit Description</label>
                </div>
                <div className="md-form mb-4">
                  <i className="fas fa-lock prefix grey-text" />
                  <input type="text" id="tags" value={subGredditTags} onChange={(e)=>setsubGredditTags(e.target.value)} className="form-control validate" />
                  <label data-error="wrong" data-success="right" htmlFor="orangeForm-pass">Tags</label>
                </div>
                <div className="md-form mb-4">
                  <i className="fas fa-lock prefix grey-text" />
                  <input type="text" id="bannedwords" value={subGredditBannedWords} onChange={(e)=>setsubGredditBannedWords(e.target.value)} className="form-control validate" />
                  <label data-error="wrong" data-success="right" htmlFor="orangeForm-pass">Banned Words</label>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button onClick={CreateSubGreddit}  data-dismiss="modal" aria-label="Close" className="btn btn-deep-orange">Sign up</button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <a href className="btn btn-primary btn-roundedmb-4 my-5" data-toggle="modal" data-target="#modalRegisterForm">Make a New SubGreddit</a>
        </div>
        </div>
        {allSubgreddits.map((subGreddit) => (
            <div key={subGreddit.subGredditName}  className=" my-3 card w-75">
                <div className="card-body my-3">
                <Link onClick={GotoSubreddit} > <h5 className="card-title" id ={subGreddit.subGredditName} >{subGreddit.subGredditName}</h5> </Link> 
                    <p className="card-text">{subGreddit.subGredditDescription}</p>
                    
                    <h6 className="card-title"> Number of Followers : {subGreddit.subGredditnumfollowers}</h6>
                    <h6 className="card-title"> Number of Posts : {subGreddit.subGredditnumposts}</h6>
                    <div>
                      BannedWords : {subGreddit.subGredditBannedWords.map((bannedWord) => (<div className="chip" data-mdb-close="true" >{bannedWord.bannedWord} </div>))}
                    </div>
                    <div>
                      Tags : {subGreddit.subGredditTags.map((bannedWord) => (<div className="chip" data-mdb-close="true" >{bannedWord.tag} </div>))}
                    </div>
                    
                   <div className='py-2'> <button onClick={()=>deleteSubGreddit(subGreddit.subGredditName)} className="btn btn-info mx-2">Delete</button>
                   
                   
                   {/* {(!(followed.includes(UserName.username))?<button onClick={() => {FollowUser(UserName.username); console.log(followed)}} className="btn btn-info">Follow</button> : (<button onClick={() => {UnfollowUser(UserName.username)}} className="btn btn-info">Unfollow</button>))} */}
              </div>
                </div>
            </div>
        ))}
        </div>
    );

  
}
