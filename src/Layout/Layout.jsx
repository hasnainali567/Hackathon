import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import { auth } from '../config/firebase/firebase';
import { Toaster } from 'react-hot-toast';
import Header from '../components/Header';

const Layout = () => {
    const { user, initialLoading } = useAuth();
    const currentUser = auth.currentUser


    return (
        <div className='h-screen w-full bg-bg-primary dark:bg-dark-bg-primary' >
            <Header />
            <main className='h-full w-full'>
                <Toaster />
                {(currentUser && !user) || initialLoading ? (
                    <Loader />
                ) : <Outlet />}

            </main>
        </div>
    )
}

export default Layout;