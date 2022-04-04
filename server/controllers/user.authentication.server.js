// "use strict";

// const { users } = require("../models");

/**
 * Module dependencies.
 */
// var _ = require("lodash"),
// mongoose = require("mongoose"),
// User = mongoose.model('User'),
//   config = require("../config.server"),
//   models = require("../models"),
//   passport = require("passport"),
const {fixture, businessRegistration} = require("../models");
const users = require("../models/user.server.model");

config = require("../config/config.server");
models = require("../models");
jwt = require("jsonwebtoken");
jwt_decode = require("jwt-decode");

/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {
  models.users
    .findOne({
      _id: id,
    })
    .exec(function (err, user) {
      if (err) return next(err);
      if (!user) return next(new Error("Failed to load User " + id));
      req.profile = user;
      next();
    });
};
//admin authentication
exports.isAdmin = function (req, res, next) {
  return (req, res, next) => {
    // var token = req.headers['authorization'];
    var token = req.headers["x-access-token"] || req.query["x-access-token"];
    if (token) {
      //Decode the token
      token = token.replace(/^Bearer\s/, "");
      jwt.verify(token, config.secret, async function (err, decod) {
        if (err) {
          res.status(403).json({
            success: false,
            message: "Wrong Token",
          });
        } else {
          //If user then call next() so that respective route is called.
          let userData = await fixture.findOne({
            _id: decod.data,
            // isDeleted: false,
          });
          if (!userData) {
            res.status(403).json({
              success: false,
              message: "Oops!!! You are not Authorized Please Contact Admin.",
            });
          }
          if (userData) {
            userData = userData.toJSON();
            delete userData["modified_at"];
            delete userData["created_at"];
            delete userData["__v"];
            delete userData["salt"];
            delete userData["created_at"];
            delete userData["isDeleted"];
            delete userData["password"];
            delete userData["dataSynced"];
            delete userData["deviceDetails"];
            delete userData["isPasswordSet"];
            req.user = userData;
            // req.user = decod.data;
            // console.log(userData.role);
            if (userData.role == 1) {
              next();
            }else if (userData.role == 3) {
              next();
            }  else {
              res.status(403).json({
                success: false,
                message: "Oops!!! You are not Admin.",
              });
            }
          }
        }
      });
    } else {
      res.status(403).json({
        success: false,
        message: "No Token",
      });
    }
  };
};
exports.isSuperAdmin = function (req, res, next) {
  return (req, res, next) => {
    // var token = req.headers['authorization'];
    var token = req.headers["x-access-token"] || req.query["x-access-token"];
    if (token) {
      //Decode the token
      token = token.replace(/^Bearer\s/, "");
      jwt.verify(token, config.secret, async function (err, decod) {
        if (err) {
          res.status(403).json({
            success: false,
            message: "Wrong Token",
          });
        } else {
          //If user then call next() so that respective route is called.
          let userData = await fixture.findOne({
            _id: decod.data,
            // isDeleted: false,
          });
          if (!userData) {
            res.status(403).json({
              success: false,
              message: "Oops!!! You are not Authorized Please Contact Admin.",
            });
          }
          if (userData) {
            userData = userData.toJSON();
            delete userData["modified_at"];
            delete userData["created_at"];
            delete userData["__v"];
            delete userData["salt"];
            delete userData["created_at"];
            delete userData["isDeleted"];
            delete userData["password"];
            delete userData["dataSynced"];
            delete userData["deviceDetails"];
            delete userData["isPasswordSet"];
            req.user = userData;
            // req.user = decod.data;
            // console.log(userData.role);
            if (userData.role == 1) {
              next();
            } else if(userData.role == 3) { res.status(400).json({
              // statusCode:401,
              success: false,
              message: "Oops!!! You are not Super Admin.",
            });}else{
              res.status(403).json({
                statusCode:403,
                success: false,
                message: "Oops!!! You are Admin.",
              });
            }
          }
        }
      });
    } else {
      res.status(403).json({
        success: false,
        message: "No Token",
      });
    }
  };
};

/**
 * Passport Authentcation
 */
exports.authentcationIsOwner = function (req, res, next) {
  return async (req, res, next) => {
    try {
      var token = req.headers["x-access-token"] || req.headers["token"];
      console.log("authnetication started");
      console.log("in");

      if (token) {
        console.log("token",token)
        let decoded = jwt_decode(token);
        console.log("decoded",decoded)
        if (decoded) {
          // try {
          let user = await businessRegistration.findOne({
            _id: decoded.data,
          });
          console.log("here u got user", user.planValidity <new Date() );
          if (!user) {
            res.status(403).json({
              success: false,
              message: "Oops!!! Business not found.",
            });
          }
          if (user.planValidity < new Date()) {
            res.status(403).json({
              success: false,
              message: "Oops!!! Business Subscritption Expired.",
            });
          }
          user = user.toJSON();
          let userInfo = {
            id: user._id,
            // phoneNumber: user.phoneNumber ? user.phoneNumber : "",
            // firebaseUserId: decoded.user_id,
          };
          req.user = userInfo;
          console.log("user", userInfo);
          next();
          // } catch (error) {
          //   res.status(403).json({
          //     success: false,
          //     message: "error",
          //     data: error,
          //   });
          // }
        }
      } else {
        res.status(403).json({
          success: false,
          message: "No Token",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};
exports.hasInstaTokenAuthentcation = function (req, res, next) {
  return async (req, res, next) => {
    try {
      var token = req.headers["authorization"];
      // console.log("authnetication started");
      // console.log("in");
      if (token) {
        // console.log("token",token)
        let decoded = jwt_decode(token);
        if (decoded) {
          // try {
          let user = await users.findOne({
            firebaseUID: decoded.user_id,
          });
          console.log("here u got user", user);
          if (!user) {
            res.status(403).json({
              success: false,
              message: "Oops!!! User not found.",
            });
          }
          if (user.suspended == true) {
            res.status(401).json({
              success: false,
              message: "Oops!!! User Suspended By Admin.",
            });
          }
          user = user.toJSON();
          let userInfo = {
            id: user._id,
            phoneNumber: user.phoneNumber ? user.phoneNumber : "",
            firebaseUserId: decoded.user_id,
          };
          req.user = userInfo;
          // console.log("user", userInfo);
          next();
          // } catch (error) {
          //   res.status(403).json({
          //     success: false,
          //     message: "error",
          //     data: error,
          //   });
          // }
        }
      } else {
        next();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

exports.hasAuthentcation = function (req, res, next) {
  return async (req, res, next) => {
    try {
      var token = req.headers["authorization"];
      // console.log("authnetication started");
      // console.log("in");
      if (token) {
        console.log("token",token)
        let decoded = jwt_decode(token);
        if (decoded) {
          // try {
          let user = await users.findOne({
            firebaseUID: decoded.user_id,
          });
          // console.log("here u got user", user);
          if (!user) {
            res.status(403).json({
              success: false,
              message: "Oops!!! User not found.",
            });
          }
          if (user.suspended == true) {
            res.status(401).json({
              success: false,
              message: "Oops!!! User Suspended By Admin.",
            });
          }
          user = user.toJSON();
          let userInfo = {
            id: user._id,
            phoneNumber: user.phoneNumber ? user.phoneNumber : "",
            firebaseUserId: decoded.user_id,
          };
          req.user = userInfo;
          // console.log("user", userInfo);
          next();
          // } catch (error) {
          //   res.status(403).json({
          //     success: false,
          //     message: "error",
          //     data: error,
          //   });
          // }
        }
      } else {
        res.status(403).json({
          success: false,
          message: "No Token",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

exports.hasAuthorization = function (action) {
  var _this = this;
  return function (req, res, next) {
    if (req.user) {
      let canDo = hasPermission(req.user, action);
      if (canDo) next();
      else
        return res.status(401).send({
          message: "Unauthorised",
        });
    } else {
      return res.status(401).send({
        success: false,
        message: "Unauthorised",
      });
    }
  };
};