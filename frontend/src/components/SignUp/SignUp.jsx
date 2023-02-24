import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';
export default function SignUp() {

  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [contactno, setContactno] = React.useState('');
  const [age, setAge] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      contactno: contactno,
      age: age,
      password: password
    };
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    if (response.ok) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setContactno('');
      setAge('');
      setUsername('');
      setLastname('');
      setFirstname('');
      console.log("new user created");
      toast.success("You are successfully registered. Now login with your credentials")

      setTimeout(() => {
        navigate("/login?mode=login");
      }, 2000);


    }
    else {
      console.log(json.error);
    }

  }

  return (

    <section className="vh-100" style={{ backgroundColor: '#eee' }}>
            <NavBar/>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className=" flex-fill mb-0">
                          <input value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" id="firstname" className="form-control" />
                          <label className="form-label" htmlFor="">First Name</label>
                        </div>
                        <div className=" flex-fill mb-0">
                          <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" id="lastname" className="form-control" />
                          <label className="form-label" htmlFor="">Last Name</label>
                        </div>

                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className=" flex-fill mb-0">
                          <input value={age} onChange={(e) => setAge(e.target.value)} type="number" id="age" className="form-control" />
                          <label className="form-label" htmlFor="">Age</label>
                        </div>
                        <div className=" flex-fill mb-0">
                          <input value={contactno} onChange={(e) => setContactno(e.target.value)} type="text" id="contactno" className="form-control" />
                          <label className="form-label" htmlFor="">Contact Number</label>
                        </div>

                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className=" flex-fill mb-0">
                          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="form-control" />
                          <label className="form-label" htmlFor="">Your Email</label>

                        </div>
                        <div className=" flex-fill mb-0">
                          <input value={username} onChange={(e) => setUsername(e.target.value)} type="email" id="username" className="form-control" />
                          <label className="form-label" htmlFor="">Your Username</label>

                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div className=" flex-fill mb-0">
                          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="" className="form-control" />
                          <label className="form-label" htmlFor="">Password</label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw" />
                        <div className=" flex-fill mb-0">
                          <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" id='confirmpassword' className="form-control" />
                          <label className="form-label" htmlFor=''>Repeat your password</label>
                        </div>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">

                        <Link to="/login?mode=login" className="text-body"><u>Login instead</u></Link>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="button" onClick={handleSubmit} className="btn btn-primary btn-lg">Register</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}