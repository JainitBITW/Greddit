import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useLayoutEffect } from 'react';
function WithAuth({ Component }) {

    // let navigate = useNavigate();
    let email = localStorage.getItem('email');
    let password = localStorage.getItem('password');
    if (email === 'admin' || password === 'admin') {

        return <Component></Component>
    }

    else {
        // navigate('/login?mode=login');
        return <Navigate to="/login?mode=login"/>
        alert("Please Login First");
    }
}

export default WithAuth;