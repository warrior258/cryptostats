import React from 'react'
import { Navigate } from 'react-router-dom';
import SavedCoin from '../components/SavedCoin'
import { UserAuth } from '../context/AuthContext'

const Account = () => {
  const {user} = UserAuth();

  if(user){
    return (
    
      <div style={{display:'flex', flexDirection:'column', gap:'3rem', alignItems:'center'}}>
        <div className='account-box'>
          <div>
            <h2 style={{marginBottom:'10px'}}>My Account</h2>
            <p>Welcome {user?.email}</p>
          </div>
        </div>
  
        <div className='watchList'>
          <h2 style={{marginBottom:'10px'}}>Watch List</h2>
          <SavedCoin/>
        </div>
      </div>
    )
  } else{
    return <Navigate to='/signin' />
  }
}



export default Account