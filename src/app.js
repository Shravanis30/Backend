import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json({limit: "16kb"}))   // when getting data from the form
app.use(express.urlencoded({extended:true, limit: "16kb"}))   // when getting data from the url (to accept all types of small changes)
app.use(express.static("public"))  // to store files or pictures (locally)
app.use(cookieParser())



// routes import

import userRouter from "./routes/user.routes.js"


// routes declaration
app.use("/api/v1/users", userRouter)

// https://localhost:8000/api/v1/users/register

export { app }