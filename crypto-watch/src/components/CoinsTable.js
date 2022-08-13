import { Typography, createTheme, TextField, LinearProgress, TableContainer, Table, TableHead, TableRow } from "@mui/material";
import { Container, ThemeProvider } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const { currency } = CryptoState();

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

  //dark theme to the CoinsTable
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h6" style={{ margin: 18, fontFamily: "Inter" }}>
          Cryptocurrencies Prices by Market Cap
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
                <LinearProgress style={{ backgroundColor: "gold"}}/>
            ) : (
                <Table>
                    <TableHead style={{ backgroundColor: "#EEBCID"}}>
                        <TableRow></TableRow>
                    </TableHead>
                </Table>
            )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
