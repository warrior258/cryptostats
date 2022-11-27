import React from 'react'
import { useEffect, useState } from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import axios from 'axios';

const News = () => {

  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const url = 'https://newsapi.org/v2/everything?q=crypto&from=2022-11-10&sortBy=popularity&apiKey=YOUR_API_KEY';

  const getNews = async () => {
    try {
      await axios.get(url)
        .then((response) => {
          setNews(response.data.articles);
          setLoading(false);
          console.log(response.data.articles);
        })

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNews();
  },[])

  return (
    <div>
      <h1 style={{textAlign:'center', marginBottom:'30px', fontSize:'38px', color:'white', fontWeight:'500', letterSpacing:'1px'}}>Latest Crypto News</h1>
      <div className='news'>
        {loading && news.length === 0 ? (
          <BeatLoader style={{position: 'absolute', top:'150px'}} color={'#66fcf1'} loading={loading} size={25} />
        ) : (
          <>
            {news.map((content, index) => (
              <div key={index} className='news-box'>
                {content.urlToImage ? (
                  <img src={content.urlToImage} alt="/" width={'100%'} height={'150px'} style={{objectFit:'cover'}} />
                ) : (
                  <img src='https://via.placeholder.com/400' alt="/" width={'100%'} height={'150px'} style={{objectFit:'cover'}} />
                )}
                
                <div className='news-content'>
                  <p>{content.title}</p>
                  <p>{content.publishedAt.split('T')[0]}</p>
                  <p>{content.description}</p>
                  <a href={content.url} target="_blank" rel='noreferrer'>Read More...</a>
                </div>
              </div> 
            ))}
          
          
          </>
        )}  
        

      </div>
    </div>
  )
}

export default News