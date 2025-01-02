const userSchema = require('../model/userModel');
const bcrypt = require('bcrypt');
const saltround = 10;

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await userSchema.findOne({ email });
    if (userExist) {
      return res.render("user/register", { message: "Us er already exists" });
    }

    const hashedpw = await bcrypt.hash(password, saltround);
    
    const newUser = new userSchema({
      email,
      password: hashedpw
    });
    await newUser.save();
    res.render("user/login", { message: "User created successfully" });
  } catch (error) {
    console.log(error);
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });
    
    // Check if user exists
    if (!user) {
      return res.render("user/login", { message: "User doesn't exist" });
    }

    // User exists, now check password
    const hpw = await bcrypt.compare(password, user.password);
    
    if (!hpw) {
      return res.render("user/login", { message: "Incorrect password" });
    }

    // Successful login
    req.session.user=true
    res.render("user/userhome");

  } catch (error) {
    console.log(error);
  }
}

const loadlogin = (req, res) => {
  res.render("user/login");
}

const loadregister = (req, res) => {
  res.render("user/register");
}

const loadhome=(req,res)=>{
    res.render("user/userhome")
}


const logout=(req,res)=>{
    req.session.user=null
    res.redirect("/user/signin")
}



module.exports = { registerUser, loadregister, loadlogin, login,loadhome,logout };
