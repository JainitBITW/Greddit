import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useLayoutEffect } from 'react';
const WithAuth = (Component) => {
    const AuthRoute = () => {
        const isAuth = !!localStorage.getItem("token");
        if (isAuth) {
            return <Component />;
        } else {
            return <Navigate to="/login?mode=signup" />;
        }
    };

    return AuthRoute;
}

export default WithAuth;