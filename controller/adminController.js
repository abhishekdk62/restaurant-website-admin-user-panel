const adminModel = require('../model/adminModel');
const bcrypt = require('bcrypt');
const saltround = 10;
const usermodel = require('../model/userModel');
const { log } = require('handlebars');

// Load login/signup page
const loadlogin = (req, res) => {
    if(req.session.admin)
    {
        res.redirect("/admin/adminhome") 
    }
    else
    {
        res.render("admin/login");

    }
};

// Handle login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

if(!email||!password)
{
    return res.render("admin/login", { message: "All fields required" });

}

        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.render("admin/login", { message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.render("admin/login", { message: "Incorrect password" });
        }

        req.session.admin = true; // Set admin session
        res.redirect("adminhome");
    } catch (error) {
        console.log(error);
        res.render("admin/login", { message: "An error occurred" });
    }
};

// Load admin home page with user data
const loadhome = async (req, res) => {
    try {
        const admin = req.session.admin;
        if (!admin) {
            return res.redirect("signin");
        }

        const users = await usermodel.find({}); // Fetch all users
        res.render("admin/adminhome", { users });
    } catch (error) {
        console.log(error);
        res.render("admin/adminhome", { message: "Error fetching users" });
    }
};


const logout = (req, res) => {
    try {
      req.session.admin = null;  // Destroying session
      res.redirect("/admin/signin");  // Redirect to admin login page
    } catch (error) {
      console.log(error);
    }
  };
  

  const editUser=async(req,res)=>{

try {
    const {email,password,id}=req.body
    const hashedpw=await bcrypt.hash(password,saltround)
    const user = await usermodel.findOneAndUpdate(
        { _id: id }, 
        { email, password: hashedpw }
    );
res.redirect("/admin/adminhome")    
    
} catch (error) {
    console.log(error);
}

  }
const deleteUser=async (req,res)=>{
   try {
    const {id}=req.params
    const user=await usermodel.findOneAndDelete({_id:id})
    res.redirect("/admin/adminhome")
   } catch (error) {
    console.log(error);
   }
}

const addUser=async(req,res)=>{

   try {
    const {email,password}=req.body
    const hashedpw=await bcrypt.hash(password,saltround)
    const user=await usermodel.insertMany({email:email,password:hashedpw})
    
res.redirect("/admin/adminhome")
   } catch (error) {
    console.log(error);
    
   }
}
const searchUser = async (req, res) => {
    try {
      let email = req.body["search-element"]; // Get the email from the form input
      email = email.trim(); // Remove leading and trailing spaces or special characters
  
  
      // Modify the query to match emails that start with the provided input
      const users = await usermodel.find({ email: { $regex: `^${email}`, $options: 'i' } }); // Find all users whose email starts with the input, case-insensitive
     
  
      if (users.length > 0) {
        // Render the page and pass user data to display email and password
        res.render('admin/adminhome', { users: users });
      } else {
        res.send("No users found with the provided email prefix");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Server error");
    }
  };
  
  
  
  
  
  
  


module.exports = { loadlogin, login, loadhome ,logout,editUser,deleteUser,addUser,searchUser};
