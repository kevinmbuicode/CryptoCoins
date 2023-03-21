import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";


const CoinPage = React.lazy(() => import("./Pages/CoinPage"));
const HomePage = React.lazy(() => import("./Pages/HomePage"));

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
          <Suspense fallback={<div>Hold on Loading...</div>}>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
          </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
