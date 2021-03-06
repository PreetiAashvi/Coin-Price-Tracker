import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';


function App() {
  const [coins, setcoins] = useState([]);
  const [search, setSearch] = useState('');

   useEffect(() => {
    // const timer= setInterval(() => {
    //   axios
    //   .get(
    //     'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    //   ) 
    //   .then(res => {
    //     setcoins(res.data);
    //     //console.log(res.data);
    //   })
    //   .catch(error => console.log(error));
    //     return clearInterval(timer);
    //   }, 1000);
    // });

     axios
       .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
       ) 
       .then(res => {
         setcoins(res.data);
         //console.log(res.data);
       })
       .catch(error => console.log(error));
   }, []);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='coin-app'>
        <div>
        <h1 className='coin-heading'>COIN PRICE TRACKER </h1>
        </div>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a Currency</h1>
        <form>
          <input 
           type='text'
           placeholder='Search' 
           className='coin-input'
           onChange={handleChange}
          />
        </form>
      </div>
      <div className='coin-container'>
        <div className='coin-row'>
            <div className='coin'>
                
                <h1 className='table-heading'>CRYPTOCOIN</h1>
                <p className='table-heading'>SYMBOL</p>
            </div>
            <div className='coin-data'>
                <p className='table-heading'>PRICE</p>
                <p className='table-heading'>VOLUME</p>
                <p className='table-heading'>PRICE CHANGE</p>
                <p className="table-heading">MARKET CAP</p>
            </div>
        </div>
    </div>
      {filteredCoins.map(coin => {
        return(
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />  
        )
      })}  
    </div>        
  );
}

export default App;
