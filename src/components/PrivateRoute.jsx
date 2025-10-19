import React, { useEffect } from 'react'
import {auth} from '../config/firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const {loading} = useAuth()
    useEffect(() => {
        const user = auth.currentUser;
        if (!user && !loading) {
            navigate('/login');
        }
    }, [navigate, loading]);

    return children
}

export default PrivateRoute;