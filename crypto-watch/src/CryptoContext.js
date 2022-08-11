import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("KSH");

  useEffect(()=> {
    if (currency === "KSH"){
        console.log("KSH");
        setSymbol("KSH");
    }
    else if(currency === "USD"){
        console.log("USD");
        setSymbol("$");
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
