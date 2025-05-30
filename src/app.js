import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express()

app.arguments(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json({limit: "16kb"}))   // when getting data from the form
app.use(express.urlencoded({extended:true, limit: "16kb"}))   // when getting data from the url (to accept all types of small changes)
app.use(express.static("public"))  // to store files or pictures (locally)
app.use(cookieParser())

export { app }