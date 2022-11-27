import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import Account from './routes/Account';
import CoinPage from './routes/CoinPage'
import News from './routes/News';
import Exchanges from './routes/Exchanges';
import { AuthContextProvider } from './context/AuthContext';

function App() {


  return (
    <div className="App">      

      <AuthContextProvider>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/account' element={<Account />} />
        <Route path='/news' element={<News />} />
        <Route path='/exchanges' element={<Exchanges />} />
        
        <Route path='/coin/:coinId' element={<CoinPage />}>
          <Route path=':coinId'/>
        </Route>

      </Routes>
      </AuthContextProvider>
      
    </div>
  );
}

export default App;
