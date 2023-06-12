let redis=require("redis");
let redisClient=new redis.createClient();

redisClient.on("connect",async()=>{
    console.log("Connected to redis");
})

redisClient.on("error",(err)=>{
    console.log(err.message);
})

redisClient.connect();

module.exports=redisClient