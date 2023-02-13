import React from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
const NavBar = () => {
    const [user, setuser] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setuser(false)
        }
        else {
            setuser(true)
        }
        console.log(user)
    }, [])
    const LogOut = () => {

        localStorage.removeItem('token');
        // localStorage.removeItem('isloggedin', false);
        setuser(true)
       
      }

    const LogIn = () => {
        if (localStorage.getItem('token')) {
            setuser(false)
        }
        else {
            setuser(true)
        }
        console.log(user)
    }
    

    return (
        <div>  <nav className="navbar fixed-bottom navbar-expand-lg navbar-dark bg-dark" >
            <div className="container-fluid">

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                       {user && <li className="nav-item"  >
                            <Link className="nav-link"  to="/login?mode=login" onClick={LogIn} >Login</Link>
                        </li> }
                        <li className="nav-item">
                            <Link className="nav-link" role="button" to="/"  >Pricing</Link>
                        </li>
                       { (!user)&&  <li className="nav-item">
                            <Link className="nav-link " onClick={LogOut} to='/login?mode=login' >Logout</Link>
                        </li>
                        }
                    </ul>
                </div>
            </div>
        </nav></div>
    )
}

export default NavBar