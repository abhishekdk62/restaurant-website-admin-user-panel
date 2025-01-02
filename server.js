const express = require('express')
const app = express()
const path = require('path');
const session = require('express-session');
const nocache = require('nocache');

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const connectDB = require('./db/connectDb');
const sessionVar = require('./middleware/auth');

app.use(session({secret:"key",
    saveUninitialized:true,
    resave:false,
    cookie:{
        maxAge:1000*60*60*24
    }
}))
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(nocache())

app.use("/user",userRoutes)
app.use("/admin",adminRoutes)

app.set("views",path.join(__dirname,"views"))
app.set("view engine","hbs")



connectDB
const port = 3000
app.listen(port, () => {
    console.log("**************************************");
    console.log(`app listening on http://localhost:${port}/admin/signin`)
    console.log("**************************************");

})