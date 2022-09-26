const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const borhanUser = require("../models/Borhan_User");
const passport = require("passport");
const User=require("../models/User");
const APP_CONSTANTS = require("../appConstants");

const GOOGLE_CLIENT_ID ="192073990165-k8uk1edbbhb0lm03lqb7ikvf3ibqotr5.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const FACEBOOK_CLIENT_ID ="1121036925455124";
const FACEBOOK_CLIENT_SECRET = "3912a21a8b19b58968f4b2a44cbb862d";

// const FACEBOOK_CLIENT_ID ="1192525958219281";
// const FACEBOOK_CLIENT_SECRET = "6010c379c09a770e1fc55332c8f3769dss";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      
    },
   async (accessToken, refreshToken, profile, done)=> {
     try{
      let data=profile._json;
      data=JSON.parse(JSON.stringify(data))

    let user= await User.findOne({googleId:data.sub});
    console.log(data.email,"jdvnjsndv")
    if(!user){
      console.log(profile._json,"herre is profile");
      let borhanuser = await borhanUser.create({
        isSubscribed: false,
        balance: 0,
      });

      let createData={
        email:data.email,
        firstName:data.name,
        googleId:data.sub,
        lastName:data.family_name,
        profilePic:data.picture,
        mobileNo:"9999999999",
        isEmailVerified:data.email_verified,
        role:APP_CONSTANTS.role.borhanuser,
        userData:{
          model: APP_CONSTANTS.role.borhanuser,
          data: borhanuser._id,
         }
      }

      let newUser=await await User.create(createData);
      console.log(newUser,"jhsvdcsdc");
      await borhanUser.findByIdAndUpdate(borhanuser._id, { userId: newUser._id });
      
    }else{
      console.log("login succcccc")
    }
      
  }catch(err){
    console.log(err,"here is err")
  }
  done(null, profile);
    }

  )

  
);
passport.use(
  new FacebookStrategy(
    {
      clientID:FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET ,
      callbackURL: "http://localhost:5000/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'name','link',  'photos', 'email']
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile,"herre is profile");
      done(null, profile);
    }
  )
);


passport.serializeUser((user, done) => {

  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});