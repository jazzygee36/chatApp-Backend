import express from "express"
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
const Port = process.env.PORT
import mongoose from "mongoose"
import indexRouter from  './server/loginAuth/login.routes'
import { config } from "./server/config/config"
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => console.log("Connected!"))
  .catch((error) => console.log(error));

app.use(express.json())
app.use(cors())
app.use('/api', indexRouter)

app.listen(Port, () => {console.log(`Server running on localhost${Port}`)})