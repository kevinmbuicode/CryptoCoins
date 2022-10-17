import express from "express";
import http from 'http';
import * as socketio from 'socket.io';
import axios from 'axios';

const port = 3002;

const app = express();
const httpServer = http.createServer(app)

const server = new socketio.Server(httpServer,{
    cors: {
        origin: '*',
    }
})

let CoinList = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false`

const fetchCoins = () => axios.get(CoinList);

let coinChange
server.on("connection", (socket)=> {
    if(coinChange) clearInterval(coinChange)
    setInterval(()=> socket.emit("message", fetchCoins()), 5000)
})


httpServer.listen(port)


// Previous

// import express from "express";
// import http from 'http';
// import * as socketio from 'socket.io';

// const port = 3002;

// const app = express();
// const httpServer = http.createServer(app)

// const server = new socketio.Server(httpServer,{
//     cors: {
//         origin: '*',
//     }
// })



// let timeChange
// server.on("connection", (socket)=> {
//     if(timeChange) clearInterval(timeChange)
//     setInterval(()=> socket.emit("message", new Date()), 1000)
// })


// httpServer.listen(port)

