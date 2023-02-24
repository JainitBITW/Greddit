import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import jwt from 'jwt-decode'
import { useNavigate ,Navigate,Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

const SavedPosts = () => {

    const [posts, setposts] = useState([])
    const GetPosts = async () => {
        var token = localStorage.getItem('token')
        var UserName = jwt(token).username
        const res = await fetch('http://localhost:4000/api/getsavedposts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: UserName
            })
        })
        const data = await res.json()
        console.log(data)
        if (data.success) {
            setposts(data.posts)
        }
        else {
            toast.error(data.message)
            console.log(data.message)
        }
    }
    useEffect(() => {
        GetPosts()
    }, [])
    
const RemoveSaved = async (e) => {
    e.preventDefault()
    var token = localStorage.getItem('token')
    var UserName = jwt(token).username
    var postID = e.target.id
    const res = await fetch('http://localhost:4000/api/removesavedpost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: UserName,
            postID: postID
        })
    })
    const data = await res.json()
    if (data.success) {
        toast.success(data.message)
        GetPosts()
    }
    else {
        toast.error(data.message)

    }
}

    //returning the posts as lsit of  cards   as in subgreddit page
    return (
        <div>
            <ToastContainer />
            <NavBar/> 
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center">Saved Posts</h1>
                    </div>
                </div>
                <div className="row">

                    {posts&& posts.map((post) => {
                        return (
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{post.postTitle}</h5>
                                        <p className="card-text">{post.postContent}</p>
                                        <Link to={`/subgreddit/${post.postSubGreddit}`} className="btn btn-primary">Go to SubGreddit</Link>
                                        <button id={post._id} onClick={RemoveSaved} className="btn btn-danger">Remove</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    )
                    


}

export default SavedPosts