import { AppBar, createTheme, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import { Container, ThemeProvider } from "@mui/system";
import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color="primary" position="static">
      <Container>
        <Toolbar>
          <Typography
            onClick={() => navigate("/")}
            className="Header-Typography"
          >
            Crypto Watcher
          </Typography>
          <Select
            variant="outlined"
            style={{
              width: "100px",
              height: 40,
              marginLeft: 15,
            }}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"KSH"}>KSH</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
};

export default Header;
