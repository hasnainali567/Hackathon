import React from 'react'
import Input from './ui/input'
import { Link } from 'react-router-dom'

const SignupForm = ({ disable, handleSumbit }) => {



  return (
    <form onSubmit={handleSumbit} className="space-y-6">
      <Input label="Username" id="username" name="username" placeholder="Username" type="text" />
      <Input label="Email address" id="email" name="email" placeholder="Email address" type="email" />
      <Input label="Password" id="password" name="password" placeholder="Password" type="password" />

      <button disabled={disable} className="w-full py-3 px-4 bg-[#2563EB] text-white font-bold rounded-lg hover:bg-[#2563EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB]/50 dark:focus:ring-offset-background-dark transition-all shadow cursor-pointer  duration-300 ease-in-out soft-glow" type="submit">
        Sign Up
      </button>
      <p className='text-white'>Don't have an account? <Link className='text-blue-500 underline' to="/login">Log in</Link></p>

    </form>
  )
}

export default SignupForm