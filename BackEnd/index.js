const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter')
const RecipientRouter = require('./Routes/RecipientRouter');
const donorRouter = require('./Routes/DonorRouter');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/ping', (req,res) => {
    res.send('pong');
})

const corsOptions = {
    origin:["http://localhost:3000", "https://life-link-blood-donation-system.vercel.app"], 
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true, 
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/auth',AuthRouter);
app.use('/recipient',RecipientRouter);
app.use('/donor',donorRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})