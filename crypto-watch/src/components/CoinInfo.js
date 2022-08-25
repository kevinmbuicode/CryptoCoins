import { ThemeProvider } from "@emotion/react";
import { CircularProgress } from "@mui/material";
import { createTheme } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
import "./CoinInfo.css";
import { useParams } from 'react-router-dom';

const CoinInfo = ({ coin } /** Receiving props from CoinPage */) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const { id } = useParams();

  const { currency } = CryptoState();

  
  useEffect(() => {
    const fetchHistoricData = async () => {
      const { data } = await axios.get(HistoricalChart(id, days, currency));
      setHistoricData(data);
      console.log("historic Chart data",data);
    };
    fetchHistoricData();
  },[days, currency, id]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="CoinInfo-Container">
        {/* Conditionally render Circular Progress if historic data is not loaded */}
        {!historicData ? (
          <CircularProgress color="inherit" />
        ) : (
          <>
            Something went right
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
