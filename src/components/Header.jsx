import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { auth } from '../config/firebase/firebase'

const Header = () => {
  const { logOut } = useAuth()
  const navigate = useNavigate()

  const handleLogOut = async () => {
    toast.loading("Logging out...", { id: "logout" });
    await logOut()
    toast.success("Logged out successfully!", { id: "logout" });
    navigate("/login")
  }

  return (
    <header className='flex justify-between items-center p-4 px-20 bg-bg-primary dark:bg-dark-bg-primary border-b border-white/10 dark:text-white text-black/98 '>
      <h3 className='text-lg font-semibold'>PitchCraft</h3>
      <nav className='flex '>
        <ul className='flex items-center gap-4'>
          <li><Link to="/">Home</Link></li>
          {auth.currentUser && <li>Logout </li>}
        </ul>
      </nav>
    </header>
  )
}

export default Header