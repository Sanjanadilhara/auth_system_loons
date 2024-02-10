const mongoose = require('mongoose');
const fs = require('fs');
const http=require('http');
const express = require('express');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
const userRoutes=require('./routes/userRoutes');
const viewRoutes=require('./routes/viewsRoutes');
require('dotenv').config()



mongoose.connect('mongodb://127.0.0.1:27017/dispensary')
  .then(() => console.log('Connected to mongodb'));



const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cookieParser());


app.use(function(req, res, next){
    jwt.verify(req?.cookies?.auth, process.env.JWT_KEY, function(err, decoded) {
      if(!err){
        req.isAuthorized=true;
        req.userID=decoded.id;
        console.log("authorized");
        next();
      } 
      else{
        req.isAuthorized=false;
        next();
      }
    });
  });
app.use('/api/user/', userRoutes);
app.use('/', viewRoutes);



server.listen(80)
