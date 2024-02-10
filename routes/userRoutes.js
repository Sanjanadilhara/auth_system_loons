const express = require('express');
const multer  = require('multer');
const router = express.Router();
const userController=require('../controllers/userController');



const upload = multer({ dest: 'uploads/' })
router.post('/', upload.single('avatar'), userController.create);
router.post('/login', userController.login);
router.get('/', userController.get);

module.exports=router;