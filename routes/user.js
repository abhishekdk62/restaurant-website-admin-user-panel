const express = require('express');
const app=express()
const router=express.Router()
const userController = require('../controller/userController'); // Import the userController
const auth = require('../middleware/auth');

router.get("/signin",auth.islogin,userController.loadlogin)
router.get("/signup",userController.loadregister)
router.post("/signup",userController.registerUser);
router.post("/signin",userController.login)
router.get("/home",auth.checkSession,userController.loadhome)
router.post("/logout",auth.checkSession,userController.logout)

module.exports=router