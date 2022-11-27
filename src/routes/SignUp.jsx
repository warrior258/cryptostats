import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { UserAuth } from '../context/AuthContext'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {

  const notify = () => {
    toast.success('Account created successfully!', {
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
  const {signUp} = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(email, password)
      navigate('/')
      notify()
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  }

  return (
    <div>
      <div className='signUp'>
        <h3>Sign Up</h3>
        {error ? <p>{error}</p> : null}
        <form onSubmit={handleSubmit}>
          <div>
            <input type="email" className='field' placeholder='Email...' onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div>
            <input type="password" className='field' placeholder='Password...' onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          <div>
            <input type="submit" className='register' value={'Create an Account'}/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp