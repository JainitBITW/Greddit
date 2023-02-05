import React from 'react'

import { Link } from 'react-router-dom';
// import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloggedin, setisloggedin] = useState(false);
  const Change = (e) => {
    // console.log(email, password)

    if (e.target.id === "LoginEmail") {
      // console.log(e.target.value);
      setEmail(e.target.value);
    }
    else if (e.target.id === "LoginPassword") {
      // console.log(e.target.value);
      setPassword(e.target.value);
    }

    if (e.target.value === '' ) {
      {
        setisloggedin(true);
      }
    }
   else if (e.target.id === "LoginEmail" && password=== '') {
      {
        setisloggedin(true);
      }
    }
    else if ( e.target.id === "LoginPassword" && email === '') {
      {
        setisloggedin(true);
      }
    }
    else {
      setisloggedin(false);
    }
    
  }

  const LoginAdmin = () => {
    console.log(email, password)

    if (email === 'admin' && password === 'admin') {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      localStorage.setItem('isloggedin', true);
      alert("Login Successfull");
      navigate('/profile');
    }
    else {
      alert("Login Failed Please Try Again with admin/admin");
    }
  }


  return (
    <div >
      <section className="vh-100" style={{ backgroundColor: '#508bfc' }}>
        <form>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                  <div className="card-body p-5 text-center">
                    <h3 className="mb-5">Sign in</h3>
                    <div className="form-outline mb-4">
                      <input onChange={Change} id="LoginEmail" value={email} type="text" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input id="LoginPassword" onChange={Change} value={password} type="password" className="form-control form-control-lg" />
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
                    <button className="btn btn-lg btn-block btn-primary" style={{ backgroundColor: '#dd4b39' }} type="submit"><i className="fab fa-google me-2" /> Sign in with google</button>
                    <button className="btn btn-lg btn-block btn-primary mb-2" style={{ backgroundColor: '#3b5998' }} type="submit"><i className="fab fa-facebook-f me-2" />Sign in with facebook</button>
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