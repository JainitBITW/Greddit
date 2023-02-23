import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
// import './Login.css'
import { useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';


export default function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isloggedin, setisloggedin] = useState(false);



  const LoginAdmin = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("token"))
      return

    const datatosend = { username, password }
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:
        JSON.stringify(datatosend)// body data type must match "Content-Type" header
    })
    let response = await res.json()
    console.log(response)
    if (response.error) {
      toast.error(response.error)
    }
    else {
      console.log(response)
      localStorage.setItem('token', response.token);
      setUsername("")
      setPassword("")
      toast.success("You are Successfully logged in")
      setTimeout(() => {
          navigate("/profile");
      }, 2000); 

    }
  }


  return (
    <div >
      <ToastContainer/>
      <section className="vh-100" style={{ backgroundColor: '#508bfc' }}>

        <form>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                  <div className="card-body p-5 text-center">
                    <h3 className="mb-5">Sign in</h3>
                    <div >
                      <input onChange={(e) => setUsername(e.target.value)} id="LoginUsername" value={username} type="text" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="typeusernameX-2">username</label>
                    </div>
                    <div >
                      <input id="LoginPassword" onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                    </div>
                    {/* Checkbox */}
                    <div className="form-check d-flex justify-content-start mb-4">
                      {/* <input className="form-check-input" type="checkbox" defaultValue id="form1Example3" />
                    <label className="form-check-label" htmlFor="form1Example3"> Remember password </label> */}
                    </div>
                    <button onClick={LoginAdmin} className="btn btn-primary btn-lg btn-block" type="submit" disabled={isloggedin ? true : false}>Login</button>
                    <div className="text-center">

                      <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/login?mode=signup"
                        className="link-danger">SignUp</Link></p>
                    </div>
                    <hr className="my-4" />
                    <button className="btn btn-lg btn-block btn-primary" onClick={()=>{toast.success("nahi daala hai bhai");
                  navigate('/')}} style={{ backgroundColor: '#dd4b39' }} ><i className="fab fa-google me-2" /> Sign in with google</button>
                    <button className="btn btn-lg btn-block btn-primary mb-2" onClick={()=>{toast.success("nahi daala hai bhai");
                  navigate('/')}}  style={{ backgroundColor: '#3b5998' }} ><i className="fab fa-facebook-f me-2" />Sign in with facebook</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );

}