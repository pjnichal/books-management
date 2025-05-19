// import express from "express";
import mongoose from "mongoose"
import {MONGODB_URL} from "./config/index.js"

console.log(MONGODB_URL)
mongoose.connect(MONGODB_URL).then(()=>console.log('connected to database'))
.catch((err)=>console.log(`error occurred while connecting to db`,err))

