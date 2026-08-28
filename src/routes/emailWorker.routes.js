import { defaultEmailSend } from "../controllers/emailWorker.js";
import express from "express"

//create express router 
const route = express.Router()

//POST send Default Email 
route.post("/send/default-email",defaultEmailSend);

export default route;
