import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../contexts/AuthContext';
import ResetPasswordModel from './ResetPasswordModel';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const [isPasswordResetModelOpen, setIsPasswordResetModelOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/dealsList')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  };

  const handleResetButton = () => {
    setIsPasswordResetModelOpen(true); // Open the "Password Reset" modal
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
        <button className='bg-gray-400 hover:bg-gray-500 w-full p-4 my-2 text-white font-medium'>
          Sign In
        </button>
        {error && <div className='text-red-500 font-medium text-center'>Invalid Credentials</div>}
        <div className='flex justify-end'>
          <button 
            onClick={(e) => {
              e.preventDefault();
              handleResetButton();
              e.stopPropagation();
            }} 
            className="text-white pt-4 font-medium text-right"
          >
            New to the deals portal?<br />Click here to reset your password
          </button>
        </div>
      </form>
      <ResetPasswordModel 
        isOpen={isPasswordResetModelOpen} 
        closeModal={() => {
          setIsPasswordResetModelOpen(false);
        }}
      />
    </div>
  );
};

export default Signin;