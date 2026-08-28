import app from "./server.js"
import dotenv from "dotenv"
//configure dotenv
dotenv.config({})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})