const bcrypt = require('bcrypt');
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

    if(req?.file===undefined && req.file.mimetype.startsWith("image")){
        res.status(400).send("profile picture error");
        return;
    }
    user.profilePic=req.file.filename;

    user.password=bcrypt.hashSync(user.password, 10);
    try{
        await user.save();
    }catch(e){
        res.status(400).send("invalid data");
        return;
    }
    res.status(200).send("user added successfully");
}

module.exports.login=async function(req, res){

}