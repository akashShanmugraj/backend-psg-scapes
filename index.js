const express=require('express');
// import express from "express"
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import api from "./routes/api"
//set up express app
const app=express();

//setting up body-parser
app.use(bodyParser.json());

// setting routes folder
app.use('/api',api);

//connect to mongodb
mongoose.connect('mongodb+srv://aknsubbu:aknswithA+@learn-mongodb.pghq5gn.mongodb.net/?retryWrites=true&w=majority');

//listening for requests 
app.listen(process.env.port || 4000,function(){
    console.log('now listening for requests');
});

//error handling 
app.use(function(err,req,res,next){
    res.status(422).send({error:err.message});
    
    
});
