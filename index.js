const mongoose = require('mongoose');
const fs = require('fs');
const http=require('http');
const express = require('express');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
const userRoutes=require('./routes/userRoutes');
require('dotenv').config()



mongoose.connect('mongodb://127.0.0.1:27017/dispensary')
  .then(() => console.log('Connected to mongodb'));



const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cookieParser());

app.use('/api/user/', userRoutes);

app.get('/image/:file', (req, res)=>{
    res.sendFile(process.env.filePath+req.params.file);
});


server.listen(80)
