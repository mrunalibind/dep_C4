let winston=require("winston");
let {MongoDB}=require("winston-mongodb");

let logger=winston.createLogger({
    level:"info",
    format:winston.format.json(),
    transports:[
        new MongoDB({
            db:process.env.URL,
            collection:"logs",
            options:{
                useUnifiedTopology:true
            }
        })
    ]
})
module.exports=logger