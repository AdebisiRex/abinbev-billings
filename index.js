const express =require('express');
const app =express();
const cors = require('cors')
require("dotenv").config();
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const PORT = process.env.PORT
const BILLINGS_URI = process.env.BILLINGS_URI



app.get('/', (req, res)=>{
    console.log ("We are connected")
    res.send({message: "aiit, let's do this"})
})

app.listen(PORT, (req, res)=>{
    console.log(PORT,"Billings server started")
})

const {makePayment}= require("./controller/billing.controller")
app.post("/billings/make-payment", makePayment )

