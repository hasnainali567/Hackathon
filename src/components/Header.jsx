import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='flex justify-between items-center p-4 px-20 bg-bg-primary dark:bg-dark-bg-primary border-b border-white/10 dark:text-white text-black/98 '>
        <h3 className='text-lg font-semibold'>PitchCraft</h3>
        <nav className='flex '>
            <ul className='flex items-center gap-4'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">DashBoard</Link></li>
                <li><Link to="/">Home</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header