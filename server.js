const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const session = require('express-session');
const app = express();
//--------------------------------------------------------------------------------------------------------------------------------------

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// only when ready to deploy
app.use(express.static(path.join(__dirname, './client/build')));

//-------------------------------------------------------------------------------------------------------------------------------------
//Env and Database Coonection

dotenv.config();
connectDB();

//--------------------------------------------------------------------------------------------------------------------------------------
//Routes

const Ml_link = require('./routes/Ml_link');
const Upload = require('./routes/Upload');
const Mail = require('./routes/Mail');
const Vehicleregserver = require('./routes/Vehicleregserver');
const Authentication = require('./routes/Authentication');
const fetchviolation = require('./routes/fetchviolation');
const Payment = require('./routes/Payment');

//-------------------------------------------------------------------------------------------------------------------------------------

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: true
}));
const corsOptions = {
    origin : "http://localhost:3000",
    methods : "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials : true
};
app.use(cors(corsOptions));

// Routes----------------------------------------------------------------------------------------------------------------------------------------

// only when ready to deploy
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'))
})

app.use('/',Ml_link);
app.use('/',Upload);
app.use('/',Mail);
app.use('/',Vehicleregserver);
app.use('/',Authentication);
app.use('/',fetchviolation);
app.use('/',Payment);

//----------------------------------------------------------------------------------------------------------------------------------------

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});



