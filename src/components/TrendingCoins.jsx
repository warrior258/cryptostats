import React, { useEffect, useState } from 'react'
import BeatLoader from "react-spinners/BeatLoader";
import axios from 'axios';
import { Link } from 'react-router-dom';

const TrendingCoins = () => {

  const [trending, setTrending] = useState([]);
  const url = 'https://api.coingecko.com/api/v3/search/trending';

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(url).then((response) => {
      setTrending(response.data.coins);
      setLoading(false);
      // setTimeout(() => {
      //   setLoading(false);
      // },1000);
      console.log(response.data.coins);
    })
  },[]);

  return (
    <div className='trendingCoins'>
      <h1 style={{marginBottom:'10px', fontSize:'38px', color:'white', fontWeight:'500', letterSpacing:'1px'}}>Trending Coins</h1>
      <div className='trend'>
        {loading ? (
          
           <BeatLoader style={{marginLeft:'450px', marginTop:'50px'}} color={'#66fcf1'} loading={loading} size={25} />
          
        ) : (
          <>
          {trending.map((coin) => (
            <div key={coin.item.id} className='trend-coins-container'>
              <div className='trend-coins'>
                <img src={coin.item.small} alt="/" style={{width:'40px', height:'40px', borderRadius:'50%', objectFit:'cover'}}/>
                <div>
                  <Link to={`/coin/${coin.item.id}`}>
                    <p style={{letterSpacing:'00.3px', fontSize:'16.5px', color:'white'}}>{coin.item.name}</p>
                    <p style={{fontSize:'13px', color:'grey', marginTop:'-3px'}}>{coin.item.symbol}</p>
                  </Link>
                </div>
              </div>
              <div style={{display:'flex',alignItems:'center', gap:'0.3rem', fontSize:'15px'}}>
                <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" alt="/" width={'23px'} />
                <p>{coin.item.price_btc?.toFixed(7)}$</p>
              </div>
            </div>

          ))}
          </>
        )}



        {/* {trending.map((coin) => (
          <div key={coin.item.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between', marginBottom:'5px', borderBottom:'1px solid #2e3336', cursor:'default'}}>
            <div style={{display:'flex',alignItems:'center', gap:'0.5rem', fontSize:'12px'}}>
              <img src={coin.item.small} alt="/" width={'25px'}/>
              <div>
                <p style={{letterSpacing:'00.3px'}}>{coin.item.name}</p>
                <p style={{fontSize:'10px', color:'grey'}}>{coin.item.symbol}</p>
              </div>
            </div>
            <div style={{display:'flex',alignItems:'center', gap:'0.5rem', fontSize:'12px'}}>
              <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" alt="/" width={'17px'} />
              <p>{coin.item.price_btc.toFixed(7)}$</p>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  )
}

export default TrendingCoins