const jwt=require('jsonwebtoken');
const jwtsecret='seraphic';
const User=require('../models/User');
const APP_CONSTANTS = require("../appConstants");
import universalFunctions from "../utils/universalFunctions";
const Boom = require("boom");


module.exports=
{
   
   
   isAdmin:async(req,res,next)=>{
     
    try{
        const token=req.header('auth-token');
        if(!token)
        {
            res.status(403).send({error:"Please authenticate using valid token"})
        }
        const data=jwt.verify(token,jwtsecret);
        console.log(data,"jwttokenbyadmin");
        if(!data)
        {
            throw Boom.badRequest(responseMessages.INVALID_TOKEN)
        }
        const user=await User.findOne({email:data.email});
        console.log(user,"userinisadmin")
        if(user===null) {
            throw Boom.badRequest('invalid credentials no such admin exists')

        }
        else if(user.role===APP_CONSTANTS.role.admin)
        {
            next();
        }
        else{
        throw Boom.badRequest('invalid credentials')
        }
           
    }
    catch(error) {
        universalFunctions.sendError(error, res);

    }

   }  
   
   
}