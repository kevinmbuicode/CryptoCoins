import { Box, LinearProgress, Typography, createTheme } from "@mui/material";
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

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  //Function to display umbers with commas (REGex): Source: Google/StackOverflow
  // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  // function numberWithCommas(x) {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }

  //Fetch Single Coin Data
  useEffect(() => {
    const fetchCoins = async () => {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    };
    fetchCoins();
  }, [id]);

  //While Coin Data is loading, display linear Progress
  if (!coin) {
    return <LinearProgress style={{ backgroundColor: "gold" }} />;
  }

  return (
    <Box
      flex={1}
      sx={{
        display: "flex",
        [theme.breakpoints.down("md")]: {
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRight: "2px solid grey",
          width: "30%",
          [theme.breakpoints.down("md")]: {
            display: "flex",
            flexDirection: "column",
            borderBottom: "2px solid grey",
            alignItems: "center",
            width: "100%"
          }
        }}
      >
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
      </Box>
      <CoinInfo coin={coin} />
    </Box>
  );
};

export default CoinPage;
