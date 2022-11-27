import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import {AiOutlineClose} from 'react-icons/ai'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'
import { UserAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const SavedCoin = () => {

    const [coins, setCoins] = useState([]);
    const {user} = UserAuth();

    useEffect(() => {
        onSnapshot(doc(db,'users', `${user?.email}`), (doc) => {
            setCoins(doc.data()?.watchlist)
        })
    },[user?.email])
    
    const coinPath = doc(db, 'users', `${user?.email}`);
    const deleteCoin = async (passesid) => {
        try {
            const result = coins.filter((item) => item.id !== passesid)
            await updateDoc(coinPath, {
                watchlist: result
            })
        } catch (e) {
            console.log(e.message);
        }
    }


  return (
    <div>
        {coins?.length === 0 ? (
            <p>You don't have any coin saved</p>
        ) : (
            <table cellSpacing={"10px"} width='850px' style={{lineHeight:'25px'}}>
                <thead align='center'>
                    <tr>
                        <th>Rank</th>
                        <th align='left'>Coin</th>
                        <th>24h</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody align='center'>
                    {coins?.map((coin) => (
                        <tr key={coin.id}>
                            <td>#{coin?.rank}</td>
                            <td>
                                <Link to={`/coin/${coin.id}`}>
                                    <div style={{display:'flex', alignItems:'center', color:'white',gap: "0.5rem", paddingLeft:'2px'}}>
                                        <img src={coin?.image} alt="/" width={'40px'} />
                                        <div>
                                            <p>{coin?.name}</p>
                                            <p style={{color:'gray', fontSize:'12px', marginTop:'-4px', textAlign:'left'}}>{coin?.symbol}</p>
                                        </div>
                                    </div>
                                </Link>
                            </td>
                            <td>
                            {coin?.percentage > 0 ? (
                                <p style={{color:'#3CCF4E'}}>+{coin?.percentage.toFixed(2)}%</p>
                            ) : (
                                <p style={{color:'#FF1E1E'}}>{coin?.percentage.toFixed(2)}%</p>
                            )
                                
                            }
                            </td>
                            <td><AiOutlineClose onClick={() => deleteCoin(coin.id)} style={{cursor:'pointer'}} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}

    </div>
  )
}

export default SavedCoin