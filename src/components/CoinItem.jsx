import { Sparklines, SparklinesLine } from 'react-sparklines';
import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const CoinItem = ({ coin }) => {

  const notify = () => {
    toast.success('Added successfully!', {
      // toastId: 'success1',
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

  const notify2 = () => {
    toast.error('Log In to save coin!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  };


  const [savedCoin, setSavedCoin] = useState(false);
  const {user} = UserAuth();
  const navigate = useNavigate();

  const coinPath = doc(db, 'users', `${user?.email}`);
  
  const saveCoin = async () => {
    if(user?.email){      
      setSavedCoin(true);
      await updateDoc(coinPath, {
        watchlist: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
          percentage: coin.price_change_percentage_24h
        })
      })
      notify();
    } else{
      // alert('Please signIn to save a coin');
      notify2();
      // navigate('/signin')
    }
  }
    

  return (
    <>
    <tr>
      <td onClick={saveCoin}>
        {savedCoin ? (
          <AiFillStar style={{fontSize:'15px', cursor:'pointer'}}/>
        ) : (
          <AiOutlineStar style={{fontSize:'15px', cursor:'pointer'}}/>
        )}
        
      </td>
      <td>#{coin.market_cap_rank}</td>
      <td>
        <Link to={`/coin/${coin.id}`}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", paddingLeft:'2px'}}>
            <img src={coin.image} alt={coin.name} width="30px" />
            <p style={{color:'white'}}>{coin.name}</p>
          </div>        
        </Link>
      </td>
      <td>{coin.symbol.toUpperCase()}</td>
      <td>${coin.current_price.toLocaleString()}</td>
      <td>
        {coin.price_change_percentage_24h > 0 ? (
            <p style={{color:'#3CCF4E'}}>+{coin.price_change_percentage_24h.toFixed(2)}%</p>
        ) : (
            <p style={{color:'#FF1E1E'}}>{coin.price_change_percentage_24h.toFixed(2)}%</p>
        )
            
        }
      </td>
      <td>${coin.market_cap.toLocaleString()}</td>
      <td>${coin.total_volume.toLocaleString()}</td>
      <td>
        {coin.price_change_percentage_24h > 0 ? (
          <Sparklines data={coin.sparkline_in_7d.price}>
            <SparklinesLine color="#3CCF4E" />
          </Sparklines>
        ) : (
          <Sparklines data={coin.sparkline_in_7d.price}>
            <SparklinesLine color="#FF1E1E" />
          </Sparklines>
        )}

        
      </td>
    </tr>
    {/* <ToastContainer /> */}
    </>
    
  );
};

export default CoinItem;
