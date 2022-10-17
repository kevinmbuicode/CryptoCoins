import { AppBar, createTheme, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import { Container, ThemeProvider } from "@mui/system";
import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import {CryptoState} from '../CryptoContext';

const Header = () => {
  const navigate = useNavigate();
  const {currency, setCurrency} = CryptoState();

  const darkBlueTheme = createTheme({
    palette: {
      primary: {
        main: "#002E94",
      },
    },
  });

  return (
    <ThemeProvider theme={darkBlueTheme}>
    <AppBar color="primary" position="static">
      <Container>
        <Toolbar>
          <Typography
            onClick={() => navigate("/")}
            className="Header-Typography"
            variant="h6"
            fontWeight={900}
          >
            Crypto Watcher
          </Typography>
          <Select
            variant="outlined"
            style={{
              width: "100px",
              color: "white",
              border: "1px solid white",
              height: 40,
              marginRight: 15,
            }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"EUR"}>EURO</MenuItem>
            <MenuItem value={"AUD"}>AUD</MenuItem>
            <MenuItem value={"CAD"}>CAD</MenuItem>
            <MenuItem value={"GBP"}>GBP</MenuItem>
            <MenuItem value={"BTC"}>BTC</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
};

export default Header;
