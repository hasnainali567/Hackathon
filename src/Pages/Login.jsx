import React, { useCallback } from 'react'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {

  const { loginWithEmail, loading, setLoading } = useAuth();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get('email');
    const password = form.get('password');

    try {
      setLoading(true);
      toast.loading('Logging in...', { id: 'login' });
      await loginWithEmail(email, password);
      toast.success('Logged in successfully!', { id: 'login' });
      setLoading(false);
    } catch (error) {
      toast.error('Failed to log in.', { id: 'login' });
      console.log(error);
    }
  }, [loginWithEmail, setLoading]);

  return (
    <div className='w-full h-screen '>
      <header>
        <h1></h1>
      </header>
      <div className='h-full w-full flex items-center justify-center'>
        <div className='w-full max-w-100 flex flex-col items-center gap-4 px-6 py-12 rounded-xl shadow-xl shadow-white/10 border-4 border-white/10  bg-white/10 backdrop:blur-2xl'>
          <div className="text-center flex flex-col gap-2 ">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome Back</h2>
            <p className=" text-sm text-slate-600 dark:text-slate-400">Log in to continue to your dashboard.</p>
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

export default Login