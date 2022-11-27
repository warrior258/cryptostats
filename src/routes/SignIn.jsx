import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {signIn, UserAuth} from '../context/AuthContext'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignIn = () => {

  const notify = () => {
    toast.success('Logged in successfully!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {signIn} = UserAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password)
      navigate('/account')
      notify()
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  }


  return (
    <div>
      <div className='signUp'>
        {error ? <p style={{color:'red'}}>{error}</p> : null}
        <h3>Sign In</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="email" className='field' placeholder='Email...' onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div>
            <input type="password" className='field' placeholder='Password...' onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          <div>
            <input type="submit" className='register' value={'Sign In'}/>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SignIn