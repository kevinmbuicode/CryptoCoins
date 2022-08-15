import { LinearProgress, Typography } from "@mui/material";
import axios from "axios";
//import HTMLReactParser from "html-react-parser";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import "./CoinPage.css";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState([]);

  const { currency, symbol } = CryptoState();

  //Function to display umbers with commas (REGex): Source: Google/StackOverflow
  // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  // function numberWithCommas(x) {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }

  //Fetch Single Coin Data
  useEffect(() => {
    const fetchCoins = async () => {
      const { data } = await axios.get(SingleCoin(id));
      console.log(data);
      setCoin(data);
    };
    fetchCoins();
  }, [id]);

  //While Coin Data is loading, display linear Progress
  if (!coin) {
    return <LinearProgress style={{ backgroundColor: "gold" }} />;
  }

  return (
    <div className="CoinPage-Container">
      <div className="CoinPage-Sidebar">
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          className="CoinPage-Typography"
          variant="h3"
          style={{
            marginBottom: 20,
            fontWeight: "bold",
            fontFamily: "Inter",
          }}
        >
          {coin?.name}
        </Typography>
        <Typography
          style={{
            width: "100%",
            fontFamily: "Inter",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify",
          }}
          variant="subtitle1"
        >
          {/* Add HTMLReactParser/REACTHTMLParser to Hide visible HTML dom elements */}
          {coin?.description?.uk.split(". ")[0]}.
        </Typography>
        <div
          className="CoinPage-MarketData"
          style={{
            alignSelf: "start",
            paddingTop: 25,
            padding: 10,
            width: "100%",
          }}
        >
          {/* Market Rank */}
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Inter" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          {/* Current Price */}
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Current_Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Inter" }}>
              {symbol}{" "}
              {console.log(
                coin?.market_data?.current_price?.[currency.toLowerCase()]
              )}
              {coin?.market_data?.current_price?.[currency.toLowerCase()]}
            </Typography>
          </span>
          {/* Market Cap */}
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Inter" }}>
              {coin?.market_data?.market_cap?.[currency.toLowerCase()]
                .toString()
                .slice(0, -6)}
              M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
