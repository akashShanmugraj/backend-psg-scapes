const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

//set up express app
const app=express();

//setting up body-parser
app.use(bodyParser.json());

// setting routes folder
app.use('/api',require('./routes/api'));

//connect to mongodb
mongoose.connect('');

//listening for requests 
app.listen(process.env.port || 4000,function(){
    console.log('now listening for requests');
});

//error handling 
app.use(function(err,req,res,next){
    res.status(422).send({error:err.message});
});
