import React from 'react'
import Coins from '../components/Coins'
import '../App.css';
import TrendingCoins from '../components/TrendingCoins';
import BasicMarketInfo from '../components/BasicMarketInfo'


const Home = () => {
  return (
    <div style={{padding:'20px 250px'}}>
        <BasicMarketInfo />
        <Coins />
        <TrendingCoins/>
    </div>
  )
}

export default Home