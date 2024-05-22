const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const session = require('express-session');
const path = require('path'); // Require path module for working with file paths

// Import routes
const Ml_link = require('./routes/Ml_link');
const Upload = require('./routes/Upload');
const Mail = require('./routes/Mail');
const Vehicleregserver = require('./routes/Vehicleregserver');
const Authentication = require('./routes/Authentication');
const fetchviolation = require('./routes/fetchviolation');
const Payment = require('./routes/Payment');

dotenv.config();
connectDB();

const app = express();

// Env and Database Connection
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: true
}));

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true
};
app.use(cors(corsOptions));

// Serve static files for production
app.use(express.static(path.join(__dirname, './client/build')));

// Routes
app.use('/', Ml_link);
app.use('/', Upload);
app.use('/', Mail);
app.use('/', Vehicleregserver);
app.use('/', Authentication);
app.use('/', fetchviolation);
app.use('/', Payment);

// Route for all other routes in production
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'))
});

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
