const mongoose = require('mongoose');


const User = new mongoose.Schema({
    firstName: { 
        type: String,
        required:true,
        validate:{
            validator: function(value) {
                const Reg = /^[a-z]+$/;
                return Reg.test(value);
                },
            message: 'Invalid name format'
        },
       
     },
    lastName: { 
        type: String, 
        required:true,
        validate:{
            validator: function(value) {
                const Reg = /^[a-z]+$/;
                return Reg.test(value);
                },
            message: 'Invalid name format'
        },
       
    },
    mobileNumber: { 
        type: String, 
        required:true,
        validate:{
            validator: function(value) {
                const Reg = /^0[0-9]+$/;
                return Reg.test(value) && value.length==10;
            },
            message: 'Invalid mobile number format' 
        },
       
    },
    email: { 
        type: String,
        required:true,
        validate:{
            validator: function(value) {
                const Reg = /^[^\s@<>]+@[^\s@<>]+.[^\s@<>]+$/;
                return Reg.test(value);
            },
            message: 'Invalid email format'
        },
        },
    profilePic: { type: String, required:true},
    password:{type:String, required:true}
  });

module.exports=mongoose.model("user", User);