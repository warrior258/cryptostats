import React from 'react'
import { useEffect, useState } from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import axios from 'axios';

const Exchanges = () => {
    const [loading, setLoading] = useState(true);
    const [exchanges, setExchanges] = useState([]);
    const url = 'https://api.coingecko.com/api/v3/exchanges';

    const getExchanges = async () => {
        try {
        await axios.get(url)
            .then((response) => {
            setExchanges(response.data);
            setLoading(false);
            console.log(response.data);
            })

        } catch (error) {
        console.log(error);
        }
    }

    useEffect(() => {
        getExchanges();
    },[])





  return (
    <div style={{color:'white'}}>
        <div><h1 style={{textAlign:'center', fontSize:'38px', color:'white', fontWeight:'500', letterSpacing:'1px'}}>Crypto Exchanges</h1></div>
        <div className='exchange'>
            
            <div className='exchange-box'>
                <table cellSpacing={'15px'}>
                    <thead>
                        <tr>
                            <th>Trust Score Rank</th>
                            <th align='left'>Exchange</th>
                            <th>Trust Score</th>
                            <th>24h BTC Volume</th>
                            <th>Year Established</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td><BeatLoader style={{position:'absolute', top:'200px', left:'680px'}} color={'#66fcf1'} loading={loading} size={25} />`</td>
                            </tr>
                            
                        ) : (
                            <>
                                {exchanges.map((exchange) => (
                                    <tr key={exchange.id}>
                                        <td>#{exchange.trust_score_rank}</td>
                                        <td>
                                            <div style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                                                <img src={exchange.image} alt="/" style={{width:'35px', height:'35px', borderRadius:'50%', objectFit:'cover'}}/>
                                                <p>{exchange.name}</p>
                                            </div>
                                        </td>
                                        <td>{exchange.trust_score}</td>
                                        <td>${exchange.trade_volume_24h_btc.toFixed(2)}</td>
                                        <td>
                                            {exchange.year_established ? (
                                                <p>{exchange.year_established}</p>
                                            ) : (
                                                <p style={{color:'gray'}}>N/A</p>
                                            )}
                                        
                                        </td>
                                        <td><a href={exchange.url} style={{color:'gray'}} target={'_blank'} rel="noreferrer">Visit Exchange</a></td>
                                    </tr>
                                ))}
                            </>
                        )}
                        
                        
                    </tbody>
                </table>
            </div>

            
            
        </div>


    </div>
  )
}

export default Exchanges