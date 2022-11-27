import { useEffect, useState } from 'react';
import CoinItem from './CoinItem';
import BeatLoader from "react-spinners/BeatLoader";
import axios from 'axios';

const Coins = () => {
  // console.log(coins);
  
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  const [coins, setCoins] = useState([]);
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true';

  const fetchCoins = async () => {
    try {
      await axios
        .get(url)
        .then((response) => {
          setCoins(response.data);
          setLoading(false);
          console.log(response.data);
        })
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    fetchCoins();

  },[]);



  return (

    <div>
      <h1 style={{marginBottom:'30px', fontSize:'38px', color:'white', fontWeight:'500', letterSpacing:'1px'}}>CryptoCurriences</h1>
      <div className='coins' id='cards'>
        <div className="search-bar">
          {/* <p>Seach Coin</p> */}
          <form>
            <input onChange={(e) => setSearchText(e.target.value)} type="text" className='search' placeholder='Search a coin...'/>
          </form>
        </div>


        <div className="test" style={{fontSize: '13.5px', padding:'5px'}}>
          <table cellSpacing={"10px"} width='100%'>
            <thead align='center'>
              <tr>
                <th></th>
                <th>Rank</th>              
                <th align='left'>Coin</th>
                <th>Symbol</th>
                <th>Current Price</th>
                <th>24h</th>
                <th>Market Cap</th>
                <th>Volume</th>
                <th>Last 7 Days</th>
              </tr>
            </thead>

            <tbody align='center' style={{position:'relative'}}>
              {loading ? <tr><td><BeatLoader style={{position:'absolute', top:'200px', left:'420px'}} color={'#66fcf1'} loading={loading} size={25} /></td></tr> :     
              
              <>
              {coins.filter((value)=>{
                if (searchText === ''){
                  return value
                }
                else if (value.name.toLowerCase().includes(searchText.toLowerCase())){
                  return value
                }
              }).map((coin)=>(
                <CoinItem key={coin.id} coin={coin}/>
              ))}
              </>
            }      
          
              
            </tbody>

          </table>
          
        </div>


      </div>
    </div>
  )
}

export default Coins