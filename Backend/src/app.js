const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth.routes');

dotenv.config();
const app = express();

// Middleware
const allowedOrigins = [process.env.CLIENT_URL, "https://your-production-domain.com"];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.send("API is running ✅");
});

//auth routes
app.use('/api/auth', authRouter);

module.exports = app;