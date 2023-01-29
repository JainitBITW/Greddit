import React from 'react'
import { Link } from 'react-router-dom'
const NavBar = () => {
    return (
        <div className='container'>  <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="#">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login?mode=login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="#">Pricing</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled">Disabled</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav></div>
    )
}

export default NavBar