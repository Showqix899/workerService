import express from "express"


//import routes 
import emailWorkerRoutes from "./routes/emailWorker.routes.js"



//make an express app 
const app = express()

//json parser 
app.use(express.json())

//health route 
app.use("/api/health",(req,res)=>{
    res.send("well come to the server. status 200 || ok")
})

//set routes 
app.use("/api/email",emailWorkerRoutes)



export default app;

