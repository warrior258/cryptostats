import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { chartDays } from '../assests/data';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";

const CoinPage = () => {

  const [loading, setLoading] = useState(true);

  const [coin, setCoin] = useState([]);
  const [chart, setChart] = useState([]);
  const [days, setDays] = useState(1);
  const params = useParams()

  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`;
  const chartUrl = `https://api.coingecko.com/api/v3/coins/${params.coinId}/market_chart?vs_currency=usd&days=${days}`;

  



  useEffect(() => {
    const getcoins = async () => {
      try {
        await axios.get(url)
        .then((response) => {
          setCoin(response.data);
          // setLoading(false);
          console.log(response.data); 
        });
        
      } catch (error) {
        console.log(error);
      }    
    }
  
    const getChartData = async () => {
      try {
        await axios.get(chartUrl)
        .then((response) => {
          setChart(response.data.prices);
          // setLoading(false);
          console.log(response.data.prices); 
        });
        
      } catch (error) {
        console.log(error);
      }    
    }
    getcoins();
    getChartData();
   


  },[url, chartUrl, days])


  return (    

    <div style={{display:'flex', justifyContent:'center', marginTop:'50px', position:'relative'}}>

      {coin.length === 0 && chart.length === 0 ? (
        <BeatLoader style={{position:'absolute', top:'200px'}} loading={loading} color={'#66fcf1'} size={25} />
      ) : (
        <div style={{}}>

        <div style={{display:'flex', alignItems:'center', gap:'0.5rem', color:'white'}}>
          <img src={coin.image?.large} alt="/" width={'80px'} />
          <div>
            <h1 style={{fontSize:'40px'}}>{coin.name}</h1>
            <p style={{marginTop:'-8px', color:'gray', fontSize:'14px'}}>{coin.symbol?.toUpperCase()}/USD</p>
          </div>
        </div>

        <div style={{color:'white', marginTop:'10px', paddingLeft:'10px', display:'flex', justifyContent:'space-between', marginBottom:'20px'}}>
          <div>
            <p style={{fontSize:'15px', color:'grey'}}>Price</p>
            <h2>{coin.market_data?.current_price ? (<p>${coin.market_data.current_price.usd.toLocaleString()}<span style={{fontSize:'15px', fontWeight:'500', marginLeft:'12px'}}>{coin.market_data.price_change_percentage_24h.toFixed(2) > 0 ? (<span style={{color:'#3CCF4E'}}>+{coin.market_data.price_change_percentage_24h.toFixed(2)}%</span>) : (<span style={{color:'#FF1E1E'}}>{coin.market_data.price_change_percentage_24h.toFixed(2)}%</span>)}</span></p>) : null}</h2>
          </div>

          <div className='date-btn' style={{display:'flex', alignItems:'center', gap:'1rem'}}>
            {chartDays.map((day) => (
              <button key={day.value} onClick={() => setDays(day.value)}>{day.label}</button>
            ))}
          </div>

        </div>

        <div className='chart' style={{marginBottom:'40px'}}>
  
          <Line
                data={{
                  labels: chart.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),

                  datasets: [
                    {
                      data: chart.map((coin) => coin[1]), 
                      label:`Price ( Past ${days} Days)`,        
                      borderColor: '#66fcf1',    
                      borderWidth:2,       
                    },
                  ],
                }}
                options={{
                  scales: {
                    x: {
                      grid: {
                        display: false
                      }
                    },
                    y: {
                      grid: {
                        display: false
                      }
                    },
                  },

                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />
          
        </div>

        <div style={{color:'white', marginBottom:'40px'}}>
          <h2 style={{color:'#66fcf1'}}>Marktet Stats</h2>
          <div className="market-stats">
            <div className='market-stat-col'>
              <p>Market Cap</p>
              {coin.market_data?.market_cap ? (<p style={{color:'gray'}}>${coin.market_data.market_cap.usd.toLocaleString()}</p>) : <p>N/A</p>}
            </div>

            <div className='market-stat-col'>
              <p>Volume (24h)</p>
              {coin.market_data?.market_cap ? (<p>${coin.market_data.total_volume.usd.toLocaleString()}</p>) : <p>N/A</p>}
            </div>

            <div className='market-stat-col'>
              <p>24h High</p>
              {coin.market_data?.high_24h ? (<p>${coin.market_data.high_24h.usd.toLocaleString()}</p>) : <p>N/A</p>}
            </div>

            <div className='market-stat-col'>
              <p>24h Low</p>
              {coin.market_data?.low_24h ? (<p>${coin.market_data.low_24h.usd.toLocaleString()}</p>) : <p>N/A</p>}
            </div>

            <div className='market-stat-col'>
              <p>Market Rank</p>
              <p>{coin.market_cap_rank}</p>
            </div>
            
            <div className='market-stat-col'>
              <p>Hashing Algorithm</p>
              {coin.hashing_algorithm ? <p>{coin.hashing_algorithm}</p> : <p>N/A</p>}
            </div>

            <div className='market-stat-col'>
              <p>Trust Score</p>
              {coin.tickers ? <p>{coin.liquidity_score.toFixed(2)}</p> : <p>N/A</p>}
            </div>

            <div className='market-stat-col'>
              <p>Price Change (24h)</p>
              {coin.market_data ? <p>{coin.market_data.price_change_percentage_24h.toFixed(2)}%</p> : <p>N/A</p>}
            </div>
            <div className='market-stat-col'>
              <p>Price Change (7d)</p>
              {coin.market_data ? <p>{coin.market_data.price_change_percentage_7d.toFixed(2)}%</p> : <p>N/A</p>}
            </div>
            <div className='market-stat-col'>
              <p>Price Change (30d)</p>
              {coin.market_data ? <p>{coin.market_data.price_change_percentage_30d.toFixed(2)}%</p> : <p>N/A</p>}
            </div>
            <div className='market-stat-col'>
              <p>Price Change (60d)</p>
              {coin.market_data ? <p>{coin.market_data.price_change_percentage_60d.toFixed(2)}%</p> : <p>N/A</p>}
            </div>
            <div className='market-stat-col'>
              <p>Price Change (1y)</p>
              {coin.market_data ? <p>{coin.market_data.price_change_percentage_1y.toFixed(2)}%</p> : <p>N/A</p>}
            </div>

            


          </div>
        </div>

        {/* Description */}
        <div className="desc" style={{color:'white'}}>
          <h2 style={{marginBottom:'20px',color:'#66fcf1'}}>About {coin.name}</h2>
          <div style={{textAlign:'justify', paddingBottom:'50px', width:'850px', lineHeight:'30px'}}>
            <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(coin.description ? coin.description.en : ''),}}></p>
          </div>
        </div>

      </div>

      )}

      

    </div>
  )
}

export default CoinPage;