import { ThemeProvider } from "@emotion/react";
import { Box, CircularProgress, styled } from "@mui/material";
import { createTheme } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { chartDays } from "../config/data";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const CoinInfo = ({ coin } /** Receiving props from CoinPage */) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { id } = useParams();

  const { currency } = CryptoState();

  useEffect(() => {
    const fetchHistoricData = async () => {
      const { data } = await axios.get(HistoricalChart(id, days, currency));
      setHistoricData(data);
    };
    fetchHistoricData();
  }, [days, currency, id]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const StyledBox = styled(Box)(({ theme }) => ({
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      
      padding: 20,
      paddingTop: 0,
    },
  }));

  const CustomButton = styled(Box)({
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: "gold",
      fontWeight: 700,
      color: "black",
      width: "22%",
      "&:hover": {
        backgroundColor: "black",
        color: "white",
      },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <StyledBox>
        {/* Conditionally render Circular Progress if historic data is not loaded */}

        {!historicData ? (
          <CircularProgress color="inherit" />
        ) : (
          <>
            <Line
              data={{
                labels: Array.from(historicData.prices).map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: Array.from(historicData.prices).map(
                      (coin) => coin[1]
                    ),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  points: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => {
                return (
                  <CustomButton
                    key={day.value}
                    onClick={() => setDays(day.value)}
                    selected={day.value === days}
                  >
                    {day.label}
                  </CustomButton>
                );
              })}
            </div>
          </>
        )}
      </StyledBox>
    </ThemeProvider>
  );
};

export default CoinInfo;
