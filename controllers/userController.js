const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User=require('../models/user');
const { json } = require('express');


module.exports.create=async function(req, res){

    let data=JSON.parse(req.body?.data);
    let user=new User(data);

    let isExist=await User.exists({email:user.email});
    if(isExist){
        res.status(409).send("email already exist");
        return
    }

    if(req?.file===undefined && req?.file?.mimetype?.startsWith("image")===undefined){
        res.status(400).send("profile picture error");
        return;
    }
    user.profilePic=req.file.filename;

    user.password=bcrypt.hashSync(user.password, 10);
    try{
        await user.save();
    }catch(e){
        console.log(e);
        res.status(400).send(e.message);
        return;
    }
    res.status(200).send("user added successfully");
}

module.exports.login=async function(req, res){
    let user=await User.findOne({email:req.body?.email});

    if(user){
      if(bcrypt.compareSync(req.body?.password, user.password)){
        let token = jwt.sign({ id:user._id}, process.env.JWT_KEY);
        res.cookie("auth", token);
        res.status(200).send("loging success");
      }
      else{
        res.status(401).send("incorrect password or username");
      }
    }
    else{
      res.status(404).send("user not found");
    }
  
}

module.exports.get=async function(req, res){

    if(req.isAuthorized){
        let user=await User.findById(req.userID, {firstName:true, lastName:true, profilePic:true, email:true, mobileNumber:true});
        res.status(200).json(user);
    }
    else{
        res.status(401).send("not authorized");
    }
  
}