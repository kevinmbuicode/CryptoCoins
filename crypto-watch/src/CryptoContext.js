import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("KSH");

  //Currencies available and more people are familiar with
  useEffect(()=> {
    if (currency === "GBP"){

        setSymbol("£");
    }
    else if(currency === "USD"){

        setSymbol("$");
    }
    else if(currency === "AUD"){

        setSymbol("A$");
    }
    else if(currency === "CAD"){

        setSymbol("Can$");
    }
    else if(currency === "BTC"){

        setSymbol("₿");
    }
    else if(currency === "EUR"){

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
