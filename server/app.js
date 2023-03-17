const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({path : "./config.env"});

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const PORT = process.env.PORT;
const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log("Succesfully conncted with Database");
}).catch((err) => {console.log(err)});

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    }
});

const User = mongoose.model("User", userSchema);

app.post("/register", async (req,res) => {
    const {name, email ,phone} = req.body;

    if(!name || !email || !phone)
    {
        return res.status(422).json({error: "plz fill all the fields"});
    }

    try{
        const userexists = await User.findOne({email : email});
        if(userexists)
        {
            return res.status(422).json({error: "Email already exists"});
        }
        const user =  new User({name, email ,phone});
        const userregister = await user.save();
        if(userregister)
        {
            res.status(201).json({message: "User Registered Successfully"});
        }

    } catch(err) {
        console.log(error);
    }
})

app.listen(PORT,() => {
    console.log("server started...");
});