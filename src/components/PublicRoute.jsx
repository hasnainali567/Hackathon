import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  {auth}  from '../config/firebase/firebase';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
    const {user : currentUser} = useAuth()
    const navigate = useNavigate();
    useEffect(() => {
        const user = auth.currentUser;
        if (user && currentUser) {
            navigate('/');
        }
    }, [navigate, currentUser]);
    return children;
}

export default PublicRoute