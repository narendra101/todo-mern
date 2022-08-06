import initiateApplication from "./app.js";
import dotenv from 'dotenv';


dotenv.config({path: './config.env'})


const PORT = process.env.PORT
const DB_URI = process.env.DB_URI

initiateApplication(DB_URI, PORT)