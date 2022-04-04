const User = require("../models/User");
const APP_CONSTANTS = require("../appConstants");
const Admin=require("../models/Admin_User")

module.exports={
    fixture:async(req,res)=>
    {
         try{
            let admin=await User.findOne({role:APP_CONSTANTS.role.admin})
            console.log("ashishsir",admin)
            if(admin===null){
                let adminid=await Admin.create({description:"hey its monu"})
                console.log("21", adminid);
                const newUser = await User.create({
                    firstName:"Monu",
                    lastName:"Saini",
                    email:"monu@gmail.com",
                    mobileNo:"1234567890",
                    profilePic:"1647416417333.png",
                    isEmailVerified:true,
                    role:"admin",
                    password:"satyamtomar@123",
                    userData:{
                        model:APP_CONSTANTS.role.admin,
                        data: adminid._id
                    }

                })
                console.log("21new", newUser);
            }
            else{
                console.log("user already exists");
            }
         }
         catch(err){
console.log('SOme issue while creating user - ', err)
         }
    }
}