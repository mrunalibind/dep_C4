let express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user_route");
const logger = require("./auth/logger");

let app=express();
app.use(express.json());
app.use("/user",userRouter)

app.listen(8070,async()=>{
    try {
        await connection;
        console.log("Connected to DB");
        logger.log("info","database connected");
    } catch (error) {
        console.log(error);
        logger.log("error","connection failed");
    }
    console.log("Server is running on port 8070");
})