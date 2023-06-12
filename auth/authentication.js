let jwt=require("jsonwebtoken");
const redisClient = require("../redisClint");

let auth=async(req,res,next)=>{
    try {
        let token=req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(400).send("Login Again");
        }
        let tokenValid=await jwt.verify(token,'token');
        if(!tokenValid){
            return res.status(400).send("Authentication failed");

        }
        let tokenBlack=await redisClient.get(token);
        if(tokenBlack){
            return res.send("Unauthorized, login again");
        }
        req.body.userId=tokenValid.userId;
        req.body.city=tokenValid.userCity;
        next();
    } catch (error) {
        res.send(error.message);
    }
}

module.exports={auth};