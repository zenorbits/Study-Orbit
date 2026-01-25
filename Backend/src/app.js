const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth.routes');
const batchRouter = require('./routes/batch.routes');
const fetchUserRouter = require('./routes/fetchuser.routes');


dotenv.config();
const app = express();

// Middleware
const allowedOrigins = [process.env.CLIENT_URL, "https://study-orbit-frontend.onrender.com/"];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
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

//batch routes
app.use('/api/batch', batchRouter);

//user routes
app.use('/api/user', fetchUserRouter);

module.exports = app;