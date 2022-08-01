const app=require("express")();
const express=require("express");
require("dotenv").config()
const conn=require("./config/db.config")

const run_code_router=require('./Router/run_code')
const categoryRouter=require('./Router/categoryRouter')
const problemRouter=require('./Router/problemRouter')
const userRouter=require('./Router/userRouter')

var cors = require('cors');

// use it before all route definitions
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:false}));



app.get("/",(req,res)=>{
    res.send("hello world");
})






app.use("/api/run_code/",run_code_router)

app.use("/category",categoryRouter)
app.use("/problem",problemRouter)
app.use("/user",userRouter)



app.listen((5000),()=>{
    console.log("App is listing at port 5000");
})