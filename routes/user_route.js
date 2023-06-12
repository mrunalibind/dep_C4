let express=require("express");
const { UserModel } = require("../model/user_model");
let userRouter=express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const redisClient = require("../redisClint");

userRouter.post("/register",async(req,res)=>{
    try {
        let {name,email,city,password}=req.body;
        let user=await UserModel.findOne({email});
        if(user){
            return res.status(400).send({"msg":"User is already registered"});
        }
        bcrypt.hash(password, 5, async function(err, hash) {
            let user=new UserModel({name,email,city,password:hash});
            await user.save();
            res.status(200).send({"msg":"User is register Successfully"});
        });
    } catch (error) {
        res.status(500).send({"msg":error.message});
    }
})
userRouter.post("/login",async(req,res)=>{
    try {
        let {email,password}=req.body;
        let user=await UserModel.findOne({email});
        if(!user){
            return res.status(400).send({"msg":"User is not present"});
        }
        bcrypt.compare(password, user.password, async function(err, result) {
            if(result){
                let token=jwt.sign({userId:user._id,userCity:user.city},'token',{expiresIn:"30m"});
                res.status(200).send({"msg":"Login Successfully","token":token});
            }
            

        });
    } catch (error) {
        res.status(500).send({"msg":error.message});
    }
})
userRouter.get("/logout",async(req,res)=>{
    try {
        let token=req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(400);
        }
        await redisClient.set(token,token);
        res.send("Logout Successfull");
    } catch (error) {
        res.status(500).send({"msg":error.message});
    }
})

module.exports={userRouter};