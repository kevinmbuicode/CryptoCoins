import { Typography } from "@mui/material";
import axios from "axios";
import HTMLReactParser from "html-react-parser";
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

  //Fetch Single Coin Data
  useEffect(() => {
    const fetchCoins = async () => {
      const { data } = await axios.get(SingleCoin(id));
      console.log(data);
      setCoin(data);
    };
    fetchCoins();
  }, [id]);

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
        variant="subtitle1">
        {/* Add HTMLReactParser/REACTHTMLParser to Hide visible HTML dom elements */}
          {(coin?.description?.uk.split(". ")[0])}.
        </Typography>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
