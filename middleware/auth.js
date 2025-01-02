const session = require("express-session")

const checkSession=(req,res,next)=>{
    if(req.session.user)
    {
next()
    }
    else{
        res.redirect("/user/signin")
    }
}

const islogin=(req,res,next)=>
{
if(req.session.user)
{
    res.redirect("/user/home")
}
else
{
    next()
}
}



module.exports={checkSession,islogin}