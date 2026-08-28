import express from "express"


//import routes 
import emailWorkerRoutes from "./routes/emailWorker.routes.js"



//make an express app 
const app = express()

//json parser 
app.use(express.json())

//default message
app.get("/",(req,res)=>{
    return res.json({
        message: "well come to worker service"
    })
})

//health route 
app.use("/api/health",(req,res)=>{
    res.json({
        message:"server is fine",
    })
})

//set routes 
app.use("/api/email",emailWorkerRoutes)



export default app;

