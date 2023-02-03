const express = require("express");
const authRouter = express.Router();

authRouter.get("/api/signup",(req,res)=>{
    res.send("in auth router");
});

module.exports=authRouter;