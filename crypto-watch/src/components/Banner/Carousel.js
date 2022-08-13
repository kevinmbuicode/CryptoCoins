import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import "./Carousel.css";
import trendingUpIcon from './trendingUpIcon.png';
import trendingDownIcon from './trendingDownIcon.png';

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency } = CryptoState();

  //Fetch trending coins from API and set trending state to data fetched
  useEffect(() => {
    const fetchTrendingCoins = async () => {
      const { data } = await axios.get(TrendingCoins(currency));
      console.log(data);
      setTrending(data);
    };
    fetchTrendingCoins();
  }, [currency]);

  //Map over treding array to rsturn the design oof the items to be displayed in the Alice carousel
  const items = trending.map((coin) => {
    //percentage change in coin in 24 hours
    let change = coin.price_change_percentage_24h;

    return (
      <Link className="Carousel-Item" to={`/coins/${coin.id}`} key={coin.id}>
        
        {/* coin? for error boundaries */}
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
            {coin?.symbol}
            &nbsp; {/** &nbsp //non-breaking space//Not start a new line in html */}
            <span>
                {coin?.price_change_percentage_24h.toFixed(2/**decimal points*/)}% {change >= 0 ? '▲' : '▼'}
            </span>
        </span>
        <span>
            
        </span>
      </Link>
    );
  });

  //Carousel responsive settings below
  const responsive = {
    // When pixels are zero, items displayed will be two
    0: { items: 2 },
    // When pixels are at 512 or higher, items displayed will be 4
    512: { items: 4 },
  };

  return (
    <div className="Carousel-Container">
      <AliceCarousel
        mouseTracking
        //Let Scroll be infinite
        infinite
        //Autoplay Carousel after 1000ms
        autoPlayInterval={1000}
        animationDuration={1500}
        // Disable controls on Carousel
        disableDotsControls={true}
        disableButtonsControls={true}
        //direction
        autoPlayDirection="rtl"
        autoPlay={true}
        //call the responsive object above
        responsive={responsive}
        //Items to be displayed in the Carousel
        items={items}
      />
    </div>
  );
};

export default Carousel;