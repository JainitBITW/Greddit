import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { AiOutlineProfile, AiOutlineLogout, AiOutlineLogin, AiOutlineUnorderedList } from 'react-icons/ai';
import { SiGnuprivacyguard } from 'react-icons/si'
import { ToastContainer, toast } from 'react-toastify';
import jwt from 'jwt-decode'

const NavBar2 = () => {
    const params = useParams();
    console.log(params.subgredditname)

    const [user, setuser] = useState(false)
    const navigate = useNavigate();

    const [checker, setchecker] = useState(false)
    useEffect(() => {
        const G = async () => {
            const res = await fetch('/api/getsubgredditpage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subGredditName: params.subgredditname
                })
            })

            const x = await res.json()
            console.log(x.SubGreddit)

            let token = localStorage.getItem("token")
            let decoded = jwt(token)
            let currname = decoded.username
            if (x.SubGreddit) {
                if (x.SubGreddit.subGredditCreator === currname) {
                    setchecker(true)
                }
            }
            else {
                setchecker(false)
            }

        }
        G();
        GetToken();
    }, [])
    const LogOut = () => {

        localStorage.removeItem('token');
        // localStorage.removeItem('isloggedin', false);
        setuser(true)

    }

    const GetToken = () => {
        var token = localStorage.getItem('token')
        if (token) {
            setuser(true)
        }
        var decoded = jwt(token);
        var username = decoded.username
        return username
    }


    const GTfollowers = async (e) => {
        e.preventDefault()

        navigate(`/followers/${params.subgredditname}`)
    }
    const GTPending = async (e) => {
        e.preventDefault()

        navigate(`/pending/${params.subgredditname}`)
    }
    const GTReports = async (e) => {
        e.preventDefault()
    navigate(`/reports/${params.subgredditname}`)

    
      }
    useEffect(() => {
        // LogIn();
        GetToken();
    }, [])


    return (
        <div>  <nav className="navbar fixed-bottom navbar-expand-lg navbar-dark bg-dark" >
            <div className="container-fluid">

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">

                        {(user) && <li className="nav-item">
                            <Link className="nav-link" role="button" to="/profile"  ><AiOutlineProfile /> Profile</Link>
                        </li>}

                        {(user) && <li className="nav-item">
                            <Link className="nav-link " onClick={LogOut} to='/login?mode=login' ><AiOutlineLogout />Logout</Link>
                        </li>
                        }

                        {(user) && <li className="nav-item">
                            <Link className="nav-link" to="/allsubgreddits"><AiOutlineUnorderedList />My SubGreddits</Link>
                        </li>}
                        {(user) && <li className="nav-item">
                            <Link className="nav-link" onClick={GTfollowers}><AiOutlineUnorderedList />Club Followers</Link>
                        </li>}

                        {(checker) && <li className="nav-item">
                            <Link className="nav-link" onClick={GTPending} ><AiOutlineUnorderedList />Pending Requests</Link>
                        </li>
                        }
                        {(checker) && <li className="nav-item">
                            <Link className="nav-link" onClick={GTReports} ><AiOutlineUnorderedList />Reports</Link>
                        </li>
                        }


                    </ul>
                </div>
            </div>
        </nav></div>
    )
}

export default NavBar2