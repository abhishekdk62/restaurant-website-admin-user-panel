const express = require('express');
const app=express()
const router=express.Router()

const auth = require('../middleware/auth');


const  adminController= require('../controller/adminController');
const { loadhome } = require('../controller/userController');



router.get("/signin",adminController.loadlogin)

router.post("/signin",adminController.login)

router.get("/adminhome",adminController.loadhome)

router.post("/logout", adminController.logout);

router.post("/edit-user",adminController.editUser);

router.get("/delete-user/:id",adminController.deleteUser)

router.post("/add-user",adminController.addUser)
router.post("/search",adminController.searchUser)


module.exports=router