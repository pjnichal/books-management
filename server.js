import express from "express";
import mongoose from "mongoose"
import {MONGODB_URL,PORT} from "./config/index.js"
 
if (!MONGODB_URL || !PORT) {
    console.error("MONGODB_URL or PORT is missing in environment variables.");
    process.exit(1);
}

//create express app
const app = express();

//added body parser to convert the string payload to json
app.use(express.json());



//connect to database
mongoose.connect(MONGODB_URL).then(()=>{
//start the express server and listen to the port definded in env
app.listen(PORT,()=>console.log(`API started listening on port ${PORT}.`));
})
.catch((err)=>console.error(`error occurred while connecting to db`,err))

