//require('dotenv').config({path: './env'})

import connectDB from "./db/index.js"
import dotenv from "dotenv"


dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`⚙️  Server is running at ${process.env.PORT || 8000}`)
    })
})
.catch((err)=>{
    console.log("Mongo DB connection failed: "+err)
})