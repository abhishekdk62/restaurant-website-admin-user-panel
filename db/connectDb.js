const express = require('express');
const { connect } = require('http2');
const mongoose = require('mongoose');

const connectDB=mongoose.connect("mongodb://localhost:27017/logindetails")
connectDB.then(()=>{
    console.log("**************************************");
    console.log("database connection was succesfull...!");
    console.log("**************************************");

}).catch((error)=>{
    console.log(error);
})


module.exports=connectDB