import {
  Typography,
  createTheme,
  TextField,
  LinearProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
} from "@mui/material";
import { Container, ThemeProvider } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import "./CoinsTable.css";
import socketIOClient from 'socket.io-client';

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1); //for the pagination
  const [data, setData] = useState("");

  //Navigation
  const navigate = useNavigate();

  //State from Context API
  const { currency, symbol } = CryptoState();

  //Function to display umbers with commas (REGex): Source: Google/StackOverflow
  // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  //Fetch coins from API and set coins state to data fetched
  //Fetch coins from API in config folder
  useEffect(() => {
    setLoading(true);
    const fetchCoins = async () => {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
    };
    fetchCoins();
  }, [currency]);

  // Socket
  // useEffect(() => {
  //   const socket = socketIOClient("http://127.0.0.1:3002/")
  //   socket.on("message", (coins) => {
  //     console.log(coins)
  //     setCoins(coins)
  //   })
  // }, [])
  // Socket ends here

  //dark theme to the CoinsTable
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  //Filter coins by search term
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h6" style={{ margin: 18, fontFamily: "Inter" }}>
          Cryptocurrencies Prices by Market Cap {data}
        </Typography>
        <TextField
          label="Search for a crypto currency..."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", " 24h Change", "Market Cap"].map(
                    (head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Inter",
                        }}
                        key={head}
                        align={head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <TableRow
                        className="TableBody-TableRow"
                        key={row.id}
                        onClick={() => navigate(`/coins/${row.id}`)}
                      >
                        {/* Our Image, Symbol, and name */}
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />

                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>

                        {/*Coin Price cell */}
                        <TableCell align="right">
                          {symbol} {""}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        {/* 24h change percentage */}
                        <TableCell
                          align="right"
                          style={{
                            color: profit ? "green" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit ? "▲" : "▼"}{" "}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        {/* Market Cap */}
                        <TableCell align="right">
                          {symbol} {""}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
      <Pagination
      count={(handleSearch()?.length / 10).toFixed(0)}
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}   
        onChange={(e, value) => {
            setPage(value);
            window.scroll(0, 450);
        }}
      />
    </ThemeProvider>
  );
};

export default CoinsTable;
