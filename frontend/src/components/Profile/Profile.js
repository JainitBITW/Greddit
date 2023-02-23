import React from 'react'
import WithAuth from '../WithAuth/WithAuth';
import { Navigate, useNavigate, Link  } from 'react-router-dom';
import { useState, useEffect } from "react";
import jwt from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify';



const Profile = () => {

  const [newdata, setnewdata] = useState({})
  const [editable, seteditable] = useState(false)
  const [password, setpassword] = useState("")
  const [userdata, setuserdata] = useState({})

  useEffect(() => {
    var token = localStorage.getItem("token")
    console.log(userdata)
    setuserdata(jwt(token))
    setnewdata(jwt(token))
  }, [editable])
  let navigate = useNavigate();

  const updateData = e => {
    setnewdata({
      ...newdata,
      [e.target.name]: e.target.value
    })
    // console.log('saffdas' +userdata)
  }
  const updatepassword = (e) => {
    setpassword(e.target.value)
  }
  const LogOut = () => {

    localStorage.removeItem('token');
    // localStorage.removeItem('isloggedin', false);
    navigate('/login?mode=login');
  }
  const ShowAllUsers = () => {
    navigate('/profile/allusers');
  }


  const editDetails = async () => {

    if (editable && !(userdata === newdata)) {
      
      let res = await fetch('api/editprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:
          JSON.stringify({ newdata: newdata, password: password })// body data type must match "Content-Type" header
      })
      console.log(newdata)
      let x = await res.json()
      // console.log(x)
      if (x.error) {
        toast.error(x.error)
        seteditable(!editable)
      }
      else {
        localStorage.setItem("token", x.token)
        toast.success("Profile Updated Successfully")
        seteditable(!editable)
      }
    

    }
  }
  // console.log(userdata)
  return (

    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <section className="h-100 gradient-custom-2">

        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: '150px', zIndex: 1 }} />
                    
                  </div>


                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                  
                  <div className="d-flex justify-content-end text-center py-1">

                    <div className="px-3">
                      <Link to='followers' className="mb-1 h5">{userdata.numfollowers}</Link>
                      <p className="small text-muted mb-0">Followers</p>
                    </div>
                    <div>
                      <Link to = 'following'className="mb-1 h5">{userdata.numfollowing}</Link>
                      <p className="small text-muted mb-0">Following</p>
                    </div>
                  </div>
                </div>

                <div className="card-body p-4 text-black">
                  
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    {!editable && <div className="px-2 py-2">FirstName: {userdata.firstname}</div>}
                    {editable && <><label> first name </label><input onChange={updateData} type='text' name='firstname' className="px-2 py-2" placeholder={userdata.firstname} /></>}
                    {!editable && <div className="px-2 py-2"> LastName: {userdata.lastname}</div>}
                    {editable && <><label>last name</label><input onChange={updateData} type='text' name='lastname' className="px-2 py-2" placeholder={userdata.lastname} /></>}
                    {!editable && <div className="px-2 py-2">Emel: {userdata.email}</div>}
                    {editable && <><label>email </label><input onChange={updateData} type='text' name='email' className="px-2 py-2" placeholder={userdata.email} /></>}
                    {!editable && <div className="px-2 py-2">KontactNuber : {userdata.contactno}</div>}
                    {editable && <><label>cnumber</label> <input onChange={updateData} type='text' name='contactno' className="px-2 py-2" placeholder={userdata.contactno} /></>}
                    {!editable && <div className="px-2 py-2"> userName : {userdata.username}</div>}
                    {editable && <><label>userName</label> <input onChange={updateData} type='text' name='username' className="px-2 py-2" placeholder={userdata.username} /></>}
                    {editable && <><label> Password</label><input onChange={updatepassword} type='password' name='password' className="px-2 py-2" /></>}
                    {editable && <><button onClick={editDetails}>Save</button></>}
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    </div>
                  
                  </div>
<div>                 <button onClick={LogOut}>Log Out</button></div>
 
                    <div><button onClick={ShowAllUsers}>Show All Users</button></div>
                    <div>  <button onClick={() => seteditable(!editable)}>Edit Profile</button></div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section></div>
  );
}

export default WithAuth(Profile);