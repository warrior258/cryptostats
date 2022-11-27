import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

const BasicMarketInfo = () => {

  const [marketData, setMarketData] = useState([]);
  const url = 'https://api.coingecko.com/api/v3/global';

  const getMarketData = async () => {
    try {
      await axios.get(url)
        .then((response) => {
          setMarketData(response.data.data);
          // setLoading(false);
          console.log(response.data.data);
        })

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMarketData();
  },[])

  return (

    <div className='basic-info'>
      <h1 style={{marginBottom:'20px', fontSize:'38px', color:'white', fontWeight:'500', letterSpacing:'1px'}}>Global Crypto Stats</h1>
      <div style={{}} className='basic-data-container'>
        <div className='basic-data'>
          <h2>Total Coins</h2>
          <p>{marketData.active_cryptocurrencies?.toLocaleString()}</p>
        </div>
        <div className='basic-data'>
          <h2>Total Exchanges</h2>
          <p>{marketData.markets}</p>
        </div>
        <div className='basic-data'>
          <h2>Market Cap</h2>
          <p>${marketData.total_market_cap?.usd.toLocaleString()}</p>
        </div>
        <div className='basic-data'>
          <h2>24h Volume</h2>
          <p>${marketData.total_volume?.usd.toLocaleString()}</p>
        </div>
        
      </div>
    </div>
  )
}

export default BasicMarketInfo