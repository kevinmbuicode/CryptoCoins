import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("KSH");

  //Currencies available and more people are familiar with
  useEffect(()=> {
    if (currency === "GBP"){
        console.log("GBP");
        setSymbol("£");
    }
    else if(currency === "USD"){
        console.log("USD");
        setSymbol("$");
    }
    else if(currency === "AUD"){
        console.log("AUD");
        setSymbol("A$");
    }
    else if(currency === "CAD"){
        console.log("CAD");
        setSymbol("Can$");
    }
    else if(currency === "BTC"){
        console.log("BTC");
        setSymbol("₿");
    }
    else if(currency === "EUR"){
        console.log("EUR");
        setSymbol("€");
    }
  }, [currency])

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency, setSymbol }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
