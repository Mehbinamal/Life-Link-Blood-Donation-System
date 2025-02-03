const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter')

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/ping', (req,res) => {
    res.send('pong');
})

const corsOptions = {
    origin: "http://localhost:3000", 
    methods: "GET,POST,PUT,DELETE",
    credentials: true, 
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/auth',AuthRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})