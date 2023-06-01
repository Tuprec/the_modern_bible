// CORS configuration
import express from "express";
import morgan from "morgan";
import cors from "cors";
import reviewRouter from "./routers/review.js";


// make a new express app
export const app = express()

// 1. Middleware
app.use(morgan('combined'))
app.use(express.json())
app.use(cors({
    origin: [
        /\.thibeprovost\.ikdoeict\.be$/, // Matches all subdomains under thibeprovost.ikdoeict.be
        /^(http?:\/\/)?localhost(:\d+)?$/, // Matches localhost with any port
    ],
    methods: 'GET, POST, PUT, DELETE', // Specify the allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization' // Specify the allowed request headers
}));

// 2. Routes
app.use("/api/v1/reviews", reviewRouter);