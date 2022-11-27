import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdQueryStats } from "react-icons/md"
import { UserAuth } from '../context/AuthContext'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {

  const notify = () => {
    toast.success('Logged out successfully!', {
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

  const {user, logout} = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      notify()
      await logout()
      navigate('/')
    } catch (e) {
      console.log(e.message);

    }
  }

  return (
    <>
    <div className='navbar-conatiner'>
        <div className="logo">
            <Link to='/' style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                <MdQueryStats style={{color:'#66fcf1', fontSize:'32px'}}/>
                <h1 style={{fontSize:'23px', fontWeight:'600', color:'#66fcf1'}}>CryptoStats</h1>
            </Link>           

        </div>

        

        <div className="get-started">
            <Link to='/' className='home'>Home</Link>           
            <Link to='/news' className='news'>News</Link>           
            <Link to='/exchanges' className='exchanges'>Exchanges</Link>
            {user?.email ? (
              <>
              <Link to='/account' className='account'>Account</Link>  
              <button onClick={handleSignOut}>Sign Out</button>       
              </>
            ) : (
              <>
              <Link to='/signin' className='call-to-action'>Sign In</Link>
              <Link to='/signup' className='call-to-action'>Sign Up</Link>            
              </>
            )}           
        </div>
    </div>
    <ToastContainer />
    </>
  )
}

export default Navbar