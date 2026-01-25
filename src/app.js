const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const packageRouter = require('../src/routes/package.route.js')
const hotelRouter = require('../src/routes/hotel.route.js')

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    // credentials: true
}));
app.use(cookieParser())
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Hello world")
})

app.use('/api/packages', packageRouter);
app.use('/api/hotels', hotelRouter);

module.exports = app;