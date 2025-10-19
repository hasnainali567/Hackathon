import React, { useCallback } from 'react'
import LoginForm from '../components/SignupForm'
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase/firebase';

const Signup = () => {

  const { signUpWithEmail, loading, setLoading } = useAuth();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const username = form.get('username');
    const email = form.get('email');
    const password = form.get('password');

    try {
      setLoading(true);
      toast.loading('Signing up...', { id: 'signup' });
      const {user} = await signUpWithEmail(email, password);
      await setDoc(doc(db, 'users', user.uid), {
        username,
        email,
        password
      })
      toast.success('Signed up successfully!', { id: 'signup' });
      setLoading(false);
    } catch (error) {
      toast.error('Failed to log in.', { id: 'login' });
      console.log(error);
    }
  }, [signUpWithEmail, setLoading]);

  return (
    <div className='w-full h-screen '>
      {/* <header>
        <h1></h1>
      </header> */}
      <div className='h-full w-full flex items-center justify-center'>
        <div className='w-full max-w-100 flex flex-col items-center gap-4 px-6 py-12 rounded-xl shadow-xl shadow-white/10 border-4 border-white/10  bg-white/10 backdrop:blur-2xl'>
          <div className="text-center flex flex-col gap-2 ">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Create A Account</h2>
            <p className=" text-sm text-slate-600 dark:text-slate-400">Create a account to build the future.</p>
          </div>
          <div
            className='w-full'
          >
            <LoginForm handleSumbit={handleSubmit} disable={loading} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup