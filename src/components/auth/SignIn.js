import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../contexts/AuthContext';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/account')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  };

  return (
    <div className='max-w-[700px] mx-auto my-16 p-4'>
      <div>
        <h1 className='text-3xl font-bold text-white'>Sign in to your account</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label className='py-2 font-medium text-white'>Email</label>
          <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type='email' />
        </div>
        <div className='flex flex-col py-2 pb-10 text-white'>
          <label className='py-2 font-medium'>Password</label>
          <input onChange={(e) => setPassword(e.target.value)} className='border p-3 text-black' type='password' />
        </div>
        <button className='bg-gray-400 hover:bg-gray-500 w-full p-4 my-2 text-white'>
          Sign In
        </button>
        {error && <h1 className='text-red-500 text-center'>Invalid Credentials</h1>}
      </form>
    </div>
  );
};

export default Signin;