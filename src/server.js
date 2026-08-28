import express from "express"


//import routes 
import emailWorkerRoutes from "./routes/emailWorker.routes.js"



//make an express app 
const app = express()

//json parser 
app.use(express.json())


//set routes 
app.use("/api/email",emailWorkerRoutes)



export default app;

