const express = require('express');
const router = express.Router();


router.get('/', (req, res)=>{

    res.setHeader('Content-Type', 'text/html');
    if(req.isAuthorized){
        res.sendFile(process.env.VIEWS_PATH+'index.html');
    }
    else{
        res.sendFile(process.env.VIEWS_PATH+'login.html');
    }
});
router.get('/signup', (req, res)=>{
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(process.env.VIEWS_PATH+'signup.html');
});
router.get('/login', (req, res)=>{
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(process.env.VIEWS_PATH+'login.html');
});
router.get('/image/:file', (req, res)=>{
    res.sendFile(process.env.filePath+req.params.file);
});

module.exports=router;