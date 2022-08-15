import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/system';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';
import './CoinInfo.css';


const CoinInfo = ({coin}/** Receiving props from CoinPage */) => {
    const [ historicData, setHistoricData ] = useState();
    const [ days, setDays ] = useState(1);

    const { currency } = CryptoState();

    useEffect(()=> {
        const fetchHistoricData = async () => {
            const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
            console.log(data);
            setHistoricData(data.prices);
        }
        fetchHistoricData();
    }, [coin.id, days, currency]);

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

  return (
    <ThemeProvider theme={darkTheme}>
        <div className='CoinInfo-Container'>
            Chart
        </div>
    </ThemeProvider>
  )
}

export default CoinInfo;