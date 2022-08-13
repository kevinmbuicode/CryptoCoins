import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import "./Carousel.css";


const Carousel = () => {
  const [trending, setTrending] = useState([]);
  // get states from context api
  const { currency, symbol} = CryptoState();

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

    //Function to display umbers with commas (REGex): Source: Google/StackOverflow
    // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

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
            &nbsp; {/** &nbsp //non-breaking space between symbol and price//Not start a new line in html */}
            <span style={{
                // display different green or red color depending on change in price_change_percentage_24h
                color: change > 0 ? "rgb(14, 203, 129)" : "red",
                fontWeight: "500",
            }}>
                {coin?.price_change_percentage_24h.toFixed(2/**decimal points*/)}% {change >= 0 ? '▲' : '▼'}
            </span>
        </span>
        <span style={{fontSize: 22, fontWeight: 500}}>
            {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
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
