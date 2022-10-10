const universalFunctions = require("../utils/universalFunctions");
const FirmAdminUser = require("../models/Firm_Admin_User");
const Firm = require("../models/Firm");
const User = require("../models/User");
const FirmContactGroups = require("../models/FirmContactGroups");
const FirmCaseStages = require("../models/FirmCaseStages");
const FirmEmployeeRoles = require("../models/FirmEmployeeRoles");
const FirmEmployeeTypes = require("../models/FirmEmployeeTypes");
const FirmEmployee = require("../models/FirmEmployees");
const FirmLocation = require("../models/FirmLocation");
const FirmEvent = require("../models/FirmEvent");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const { Config } = require("../config");
const Boom = require("boom");
const APP_CONSTANTS = require("../appConstants");
const responseMessages = require("../resources/response.json");
const bcrypt = require("bcryptjs");
const { json } = require("body-parser");
const { toSafeInteger } = require("lodash");

const addFirm = async (req, res) => {
  const {
    contactNo,
    firmName,
    contactPerson,
    firmEmail,
    companyRegNo,
    password,
  } = req.body;
  try {
    const schema = Joi.object({
      contactNo: Joi.string().required(),
      firmName: Joi.string().required(),
      contactPerson: Joi.string().required(),
      firmEmail: Joi.string().required(),
      companyRegNo: Joi.string().required(),
      password: Joi.string().min(6).required(),
    });
    await universalFunctions.validateRequestPayload(req.body, res, schema);

    let payload = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.findOne({
      email: firmEmail,
      role: APP_CONSTANTS.role.firmadmin,
    });

    if (user) {
      throw Boom.badRequest(responseMessages.EMAIL_ALREADY_EXISTS);
    }

    const firmAdmin = await FirmAdminUser.create({
      contactPerson: contactPerson,
      contactNo: contactNo,
    });

    const userAdded = await User.create({
      email: firmEmail,
      password: hashedPassword,
      isEmailVerified: true,
      role: APP_CONSTANTS.role.firmadmin,
      userData: {
        model: APP_CONSTANTS.role.firmadmin,
        data: firmAdmin._id,
      },
    });

    const firm = await Firm.create({
      userId: userAdded._id,
      firmName: firmName,
      companyRegNo: companyRegNo,
      contactPerson: contactPerson,
      contactNo: contactNo,
    });

    await FirmAdminUser.findOneAndUpdate(
        { _id: firmAdmin._id },
        {
          $set: {
            userId: userAdded._id,
            firmId: firm._id,
          },
        }
    );

    universalFunctions.sendSuccess(
        {
          message: "Firm Added Successfully",
          data: firm,
        },
        res
    );
  } catch (err) {
    universalFunctions.sendError(err, res);
  }
};

const loginFirm = async (req, res) => {
  const { email, password } = req.body;
  try {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().min(6).required(),
    });
    await universalFunctions.validateRequestPayload(req.body, res, schema);
    const user = await User.findOne({ email: email });
    if (!user) {
      throw Boom.badRequest(responseMessages.USER_NOT_FOUND);
    }

    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) {
      throw Boom.badRequest(responseMessages.INVALID_CREDENTIALS);
    }

    //Delete password field
    const userr = JSON.parse(JSON.stringify(user));
    delete userr.password;

    //Generate JWT Token
    const token = jwt.sign(
        {
          email: email,
          userId: user._id.toString(),
        },
        Config.jwtsecret
    );
    return universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: { token: token, user: userr },
        },
        res
    );
  } catch (err) {
    universalFunctions.sendError(err, res);
  }
};

const getAllFirms = async (req, res) => {
  try {
    const firmData = await FirmAdminUser.find().populate("userId", "email");
    universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: firmData,
        },
        res
    );
  } catch (error) {
    universalFunctions.sendError(err, res);
  }
};

const getFirmById = async (req, res) => {
  const firmId = req.params.firmId;
  try {
    const firmUser = await FirmAdminUser.findById(firmId);
    if (!firmUser) {
      throw Boom.notFound("No Such Firm");
    }
    return universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: firmUser,
        },
        res
    );
  } catch (err) {
    console.log(err);
    return universalFunctions.sendError(err, res);
  }
};

const editFirm = async (req, res) => {
  try {
    const schema = Joi.object({
      firmId: Joi.string().required(),
      contactNo: Joi.string().required(),
      firmName: Joi.string().required(),
      contactPerson: Joi.string().required(),
      companyRegNo: Joi.string().allow("").optional(),
    });
    await universalFunctions.validateRequestPayload(req.body, res, schema);
    let payload = req.body;
    await FirmAdminUser.findOneAndUpdate({ _id: payload.firmId }, payload);
    universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Firm Edited Successfully",
          data: {},
        },
        res
    );
  } catch (err) {
    universalFunctions.sendError(err, res);
  }
};

const addContactGroup = async (req, res) => {
  const { name } = req.body;
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    await universalFunctions.validateRequestPayload(req.body, res, schema);

    //check if group already exist
    const groupExist = await FirmContactGroups.find({
      $and: [{ createdBy: req.user.id }, { name: name }],
    });
    if (groupExist.length !== 0) {
      return universalFunctions.sendSuccess(
          {
            statusCode: 409,
            message: "Group already exist",
            data: {},
          },
          res
      );
    }
    const contactGroup = await FirmContactGroups.create({
      firmId: req.firm.id,
      name: name,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    });
    universalFunctions.sendSuccess(
        {
          message: "Contact Group Added Successfully",
          data: {},
        },
        res
    );
  } catch (err) {
    universalFunctions.sendError(err, res);
  }
};

const getContactGroupById = async (req, res) => {
  const contactGroupId = req.params.contactGroupId;
  try {
    const contactGroup = await FirmContactGroups.find({
      $and: [{ _id: contactGroupId }, { createdBy: req.user._id }],
    });
    if (contactGroup.length <= 0) {
      throw Boom.notFound("No Such Group");
    }
    return universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: contactGroup,
        },
        res
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

const editContactGroup = async (req, res) => {
  try {
    const schema = Joi.object({
      contactGroupId: Joi.string().required(),
      name: Joi.string().required(),
    });
    await universalFunctions.validateRequestPayload(req.body, res, schema);
    let payload = req.body;
    await FirmContactGroups.findOneAndUpdate(
        { _id: payload.contactGroupId },
        payload
    );
    universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Group Edited Successfully",
          data: {},
        },
        res
    );
  } catch (err) {
    universalFunctions.sendError(err, res);
  }
};

const getContactGroups = async (req, res) => {
  try {
    const schema = Joi.object({
      limit: Joi.number(),
      page: Joi.number(),
      search: Joi.string().allow(""),
    });
    await universalFunctions.validateRequestPayload(req.body, res, schema);

    let page = req.body.page;
    let limit = req.body.limit;
    let userData = [],
        count;

    if (req.body.search) {
      let user = await FirmContactGroups.aggregate([
        {
          $match: { name: { $regex: req.body.search, $options: "i" } },
        },
      ]);

      user.map((ele) => {
        if (ele.firmId != null) {
          userData.push(ele);
        }
      });
      count = userData.length;
    } else {
      userData = await FirmContactGroups.find({
        createdBy: req.user.id,
      })
          .skip(parseInt((page - 1) * limit))
          .limit(parseInt(limit));

      count = await FirmContactGroups.find({
        createdBy: req.user.id,
      }).countDocuments();
    }

    if (userData === null) {
      throw Boom.badRequest("cannot find any user");
    }

    universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: {
            list: userData,
            count: count,
          },
        },
        res
    );
  } catch (err) {
    universalFunctions.sendError(err, res);
  }
};

const addCaseStages = async (req, res) => {
  const { name } = req.body;
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    await universalFunctions.validateRequestPayload(req.body, res, schema);
    //check if case already exist
    const caseExist = await FirmCaseStages.find({
      $and: [{ createdBy: req.user.id }, { name: name }],
    });
    if (caseExist.length !== 0) {
      return universalFunctions.sendSuccess(
          {
            statusCode: 409,
            message: "Case Stage already exist",
            data: {},
          },
          res
      );
    }
    await FirmCaseStages.create({
      firmId: req.firm.id,
      name: name,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    });
    universalFunctions.sendSuccess(
        {
          message: "Case Stage Added Successfully",
          data: {},
        },
        res
    );
  } catch (err) {
    universalFunctions.sendError(err, res);
  }
};

const getCaseStageById = async (req, res) => {
  const caseStageId = req.params.caseStageId;
  try {
    const caseStage = await FirmCaseStages.find({
      $and: [{ _id: caseStageId }, { createdBy: req.user._id }],
    });
    if (caseStage.length <= 0) {
      throw Boom.notFound("No Such Case Stage");
    }
    return universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: caseStage,
        },
        res
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

const editCaseStage = async (req, res) => {
  const caseStageId = req.params.caseStageId;
  try {
    let payload = req.body;
    await FirmCaseStages.findOneAndUpdate({ _id: caseStageId }, payload);
    universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Case Stage Edited Successfully",
          data: {},
        },
        res
    );
  } catch (err) {
    universalFunctions.sendError(err, res);
  }
};

const getCaseStages = async (req, res) => {
  try {
    const schema = Joi.object({
      limit: Joi.number(),
      page: Joi.number(),
      search: Joi.string().allow(""),
    });
    await universalFunctions.validateRequestPayload(req.body, res, schema);

    let page = req.body.page;
    let limit = req.body.limit;
    let userData = [],
        count;

    if (req.body.search) {
      let user = await FirmCaseStages.aggregate([
        {
          $match: { name: { $regex: req.body.search, $options: "i" } },
        },
      ]);

      user.map((ele) => {
        if (ele.firmId != null) {
          userData.push(ele);
        }
      });
      count = userData.length;
    } else {
      userData = await FirmCaseStages.find({ createdBy: req.user.id })
          .skip(parseInt((page - 1) * limit))
          .limit(parseInt(limit));

      count = await FirmCaseStages.find({
        createdBy: req.user.id,
      }).countDocuments();
    }

    if (userData === null) {
      throw Boom.badRequest("cannot find any user");
    }

    universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: {
            list: userData,
            count: count,
          },
        },
        res
    );
  } catch (err) {
    universalFunctions.sendError(err, res);
  }
};

const addRole = async (req, res) => {
  const { role, modules } = req.body;
  try {
    const schema = Joi.object({
      role: Joi.string().required(),
      modules: Joi.array().items(Joi.string()),
    });
    await universalFunctions.validateRequestPayload(req.body, res, schema);
    const roleExist = await FirmEmployeeRoles.find({ name: role });
    if (roleExist.length <= 0) {
      const result = await FirmEmployeeRoles.create({
        name: role,
        modules: modules,
        firmId: req.user.userData.data,
        createdBy: req.user._id,
        updatedBy: req.user._id,
      });
      return universalFunctions.sendSuccess(
          {
            message: "Role Added Successfully",
            data: {},
          },
          res
      );
    }
    throw Boom.badRequest(responseMessages.ROLE_ALREADY_EXISTS);
  } catch (err) {
    console.log(err);
    universalFunctions.sendError(err, res);
  }
};

const getRoles = async (req, res) => {
  try {
    const schema = Joi.object({
      limit: Joi.number(),
      page: Joi.number(),
      search: Joi.string().allow(""),
    });
    await universalFunctions.validateRequestPayload(req.body, res, schema);

    let page = req.body.page;
    let limit = req.body.limit;
    let userData = [],
        count;

    if (req.body.search) {
      let user = await FirmEmployeeRoles.aggregate([
        {
          $match: { name: { $regex: req.body.search, $options: "i" } },
        },
      ]);

      user.map((ele) => {
        if (ele.firmId != null) {
          userData.push(ele);
        }
      });
      count = userData.length;
    } else {
      userData = await FirmEmployeeRoles.find({ createdBy: req.user._id })
          .skip(parseInt((page - 1) * limit))
          .limit(parseInt(limit));

      count = await FirmEmployeeRoles.find({
        createdBy: req.user._id,
      }).countDocuments();
    }

    if (userData === null) {
      throw Boom.badRequest("cannot find any user");
    }

    universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: {
            list: userData,
            count: count,
          },
        },
        res
    );
  } catch (err) {
    console.log(err);
    universalFunctions.sendError(err, res);
  }
};

const getRoleById = async (req, res) => {
  const roleId = req.params.roleId;
  try {
    const result = await FirmEmployeeRoles.findById(roleId);
    return universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: result,
        },
        res
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

const editRole = async (req, res) => {
  const roleId = req.params.roleId;
  const { role, modules } = req.body;
  try {
    const schema = Joi.object({
      role: Joi.string().required(),
      modules: Joi.array().items(Joi.string()),
    });
    await universalFunctions.validateRequestPayload(req.body, res, schema);
    const result = await FirmEmployeeRoles.findOneAndUpdate(
        { _id: roleId },
        { $set: { name: role, modules: modules } }
    );
    // const updatedModules =
    universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Role Edited Successfully",
          data: {},
        },
        res
    );
  } catch (err) {
    console.log(err);
    universalFunctions.sendError(err, res);
  }
};

const getSelectOptions = async (req, res) => {
  const options = APP_CONSTANTS.firmEmployeeModules;
  universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: "",
        data: options,
      },
      res
  );
};

const getRolesOptions = async (req, res) => {
  try {
    const rolesOptions = await FirmEmployeeRoles.find();
    const updatedRolesOptions = rolesOptions.map((role) => {
      return { value: role._id, label: role.name };
    });
    universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "",
          data: updatedRolesOptions,
        },
        res
    );
  } catch (err) {
    universalFunctions.sendError(err, res);
    console.log(err);
  }
};

const getEmployeeTypes = async (req, res) => {
  try {
    const employeeTypes = await FirmEmployeeTypes.find();
    const updatedEmployeeTypes = employeeTypes.map((empType) => {
      return { value: empType._id, label: empType.name };
    });
    universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "",
          data: updatedEmployeeTypes,
        },
        res
    );
  } catch (err) {
    universalFunctions.sendError(err, res);
    console.log(err);
  }
};

const addEmployee = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    streetNo,
    area,
    country,
    state,
    city,
    zipcode,
    ratePerHour,
    firmEmployeeRoleId,
    firmEmployeeTypeId,
  } = req.body;
  try {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      dateOfBirth: Joi.string().required(),
      streetNo: Joi.string().required(),
      area: Joi.string().required(),
      country: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      zipcode: Joi.string().required(),
      ratePerHour: Joi.number().required(),
      firmEmployeeTypeId: Joi.string().hex().length(24).required(),
      firmEmployeeRoleId: Joi.string().hex().length(24).required(),
    });
    await universalFunctions.validateRequestPayload(req.body, res, schema);

    const user = await User.findOne({ email: email });
    if (user) {
      const employeeExist = await FirmEmployee.find({
        $and: [{ userId: user._id }, { firmId: req.user.userData.data }],
      });
      console.log("EMPLOYEE EXIST : ", employeeExist);
      if (employeeExist.length <= 0) {
        const result = await FirmEmployee.create({
          firmId: req.user.userData.data,
          firmEmployeeTypeId: firmEmployeeTypeId,
          firmEmployeeRoleId: firmEmployeeRoleId,
          ratePerHour: ratePerHour,
          userId: user._id,
          createdBy: req.user._id,
          updatedBy: req.user._id,
          status: APP_CONSTANTS.firmEmployeeStatus.active,
        });
      } else {
        throw Boom.badRequest(responseMessages.EMPLOYEE_ALREADY_EXISTS);
      }
    } else {
      console.log({
        email: email,
        firstName: firstName,
        lastName: lastName,
        country: country,
        state: state,
        city: city,
        zipcode: zipcode,
        dateOfBirth: dateOfBirth,
        streetNo: streetNo,
        area: area,
      });
      const userResult = await User.create({
        email: email,
        firstName: firstName,
        lastName: lastName,
        country: country,
        state: state,
        city: city,
        zipcode: zipcode,
        dateOfBirth: dateOfBirth,
        streetNo: streetNo,
        area: area,
      });

      const result = await FirmEmployee.create({
        firmId: req.user.userData.data,
        firmEmployeeTypeId: firmEmployeeTypeId,
        firmEmployeeRoleId: firmEmployeeRoleId,
        ratePerHour: ratePerHour,
        userId: userResult._id,
        createdBy: req.user._id,
        updatedBy: req.user._id,
        status: APP_CONSTANTS.firmEmployeeStatus.active,
      });
    }

    universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Employee Added !",
          data: "",
        },
        res
    );
  } catch (err) {
    universalFunctions.sendError(err, res);
    console.log(err);
  }
};

const getEmployees = async (req, res) => {
  try {
    const schema = Joi.object({
      limit: Joi.number(),
      page: Joi.number(),
      search: Joi.string().allow(""),
    }).unknown(true);
    await universalFunctions.validateRequestPayload(req.query, res, schema);

    let page = req.query.page;
    let limit = req.query.limit;
    let userData = [],
        count;

    if (req.query.search) {
      console.log("QUERY SEARCH = ", req.query.search);
      let users = await User.aggregate([
        {
          $match: { email: { $regex: req.query.search, $options: "i" } },
        }
      ]);

      const result = await FirmEmployee.find({
        userId: { $in: users.map((user) => user._id) },
      }).populate("userId");

      userData = result;
      count = userData.length;
    } else {
      userData = await FirmEmployee.find({
        $and: [{ createdBy: req.user._id }, { firmId: req.user.userData.data }],
      })
          .populate("userId")
          .skip(parseInt((page - 1) * limit))
          .limit(parseInt(limit));

      count = await FirmEmployee.find({
        createdBy: req.user._id,
      }).countDocuments();
    }
    if (userData === null) {
      throw Boom.badRequest("cannot find any user");
    }

    universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: {
            list: userData,
            count: count,
          },
        },
        res
    );
  } catch (err) {
    universalFunctions.sendError(err, res);
    console.log(err);
  }
};

const getEmployeeById = async (req, res) => {
  const employeeId = req.params.employeeId;
  try {
    const result = await FirmEmployee.findById(employeeId).populate("userId");
    return universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Success",
          data: result,
        },
        res
    );
  } catch (error) {
    return universalFunctions.sendError(err, res);
  }
};

const editEmployee = async (req, res) => {
  const employeeId = req.params.employeeId;
  const { ratePerHour, status } = req.body;
  try {
    const schema = Joi.object({
      ratePerHour: Joi.number().required(),
      status: Joi.string().required(),
    });
    await universalFunctions.validateRequestPayload(req.body, res, schema);
    const result = await FirmEmployee.findOneAndUpdate(
        { _id: employeeId },
        { $set: { status: status, ratePerHour: ratePerHour } }
    );
    universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Employee Edited Successfully",
          data: {},
        },
        res
    );
  } catch (err) {
    console.log(err);
    universalFunctions.sendError(err, res);
  }
};

const addEventLocation = async (req, res) => {
  const { name, address1, address2, country, state, city, zipcode } = req.body;
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      address1: Joi.string().required(),
      address2: Joi.string().required(),
      country: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      zipcode: Joi.string().required(),
    });
    await universalFunctions.validateRequestPayload(req.body, res, schema);
    // const location = await FirmLocation.findOne({ name: name });
    const location = await FirmLocation.findOne({
      $and: [{ firmId: req.user.userData.data }, { name: name }],
    });

    if (location) {
      throw Boom.badRequest(responseMessages.LOCATION_ALREADY_EXISTS);
    }
    const result = await FirmLocation.create({
      firmId: req.user.userData.data,
      name: name,
      address1: address1,
      address2: address2,
      country: country,
      state: state,
      city: city,
      zipcode: zipcode,
    });

    console.log("RESPONSE = ", req.user);

    universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Event Location Added !",
          data: "",
        },
        res
    );
  } catch (err) {
    universalFunctions.sendError(err, res);
    console.log(err);
  }
};

// const getEventLocation = async (req, res) => {
//   try {
//     const schema = Joi.object({
//       limit: Joi.number(),
//       page: Joi.number(),
//       search: Joi.string().allow(""),
//     });
//     await universalFunctions.validateRequestPayload(req.query, res, schema);

//     let page = req.query.page;
//     let limit = req.query.limit;
//     let userData = [],
//       count;

//     console.log("PAGE = ", page);
//     console.log("LIMIT = ", limit);

//     if (req.query.search) {
//         let users = await FirmLocation.aggregate([
//             {
//               $match: { name: { $regex: req.query.search, $options: "i" } },
//             }
//           ]);

//       console.log("After Filter User Data = ", users);
//       users.map((ele) => {
//         if (ele.firmId != null) {
//           userData.push(ele);
//         }
//       });
//       count = userData.length;
//     } else {
//       console.log("REQ.USER = ", req.user.userData.data);
//       //   userData = await FirmLocation.find({ firmId: req.user.userData.data })
//       userData = await FirmLocation.find()
//         .skip(parseInt((page - 1) * limit))
//         .limit(parseInt(limit));

//       count = await FirmLocation.find({
//         firmId: req.user.userData.data,
//       }).countDocuments();
//     }

//     if (userData === null) {
//       throw Boom.badRequest("cannot find any user");
//     }

//     universalFunctions.sendSuccess(
//       {
//         statusCode: 200,
//         message: "Success",
//         data: {
//           list: userData,
//           count: count,
//         },
//       },
//       res
//     );
//     // const result = await FirmLocation.find({firmId: req.user.userData.data});
//     // console.log('REQUEST USER = ', req.user);
//     // return universalFunctions.sendSuccess(
//     //   {
//     //     statusCode: 200,
//     //     message: "Success",
//     //     data: result,
//     //   },
//     //   res
//     // );
//   } catch (err) {
//     universalFunctions.sendError(err, res);
//     console.log(err);
//   }
// };

const getEventLocation = async (req, res) => {

}

const addEvent = async (req, res) => {
  const {
    caseId,
    firmEmployees,
    eventName,
    startDate,
    endDate,
    description,
    startTime,
    endTime,
    location,
    isRepeated,
    repeatType,
    repeatDuration,
    days,
    repeatEndedOn,
  } = req.body;

  try {
    const schema = Joi.object({
      caseId: Joi.string().hex().length(24).allow("").optional(),
      firmEmployees: Joi.array().items(Joi.string()).optional(),
      eventName: Joi.string().required(),
      startDate: Joi.string().required(),
      endDate: Joi.string().required(),
      description: Joi.string().required(),
      startTime: Joi.string().required(),
      endTime: Joi.string().required(),
      location: Joi.string().required(),
      isRepeated: Joi.boolean().required(),
      repeatType: Joi.string().required(),
      repeatDuration: Joi.number().required(),
      days: Joi.array().items(Joi.string()).optional(),
      repeatEndedOn: Joi.string().allow(null).optional(),
    });
    await universalFunctions.validateRequestPayload(req.body, res, schema);

    const result = await FirmEvent.create({
      caseId,
      firmEmployees,
      eventName,
      startDate,
      endDate,
      description,
      startTime,
      endTime,
      location,
      isRepeated,
      repeatType,
      repeatDuration,
      days,
      repeatEndedOn,
    });

    universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Event Added !",
          data: "",
        },
        res
    );
  } catch (err) {
    universalFunctions.sendError(err, res);
    console.log(err);
  }
};

module.exports = {
  addFirm,
  getAllFirms,
  getFirmById,
  editFirm,
  loginFirm,
  addContactGroup,
  getContactGroups,
  addCaseStages,
  getCaseStages,
  getContactGroupById,
  editContactGroup,
  getCaseStageById,
  editCaseStage,
  addRole,
  getRoles,
  getRoleById,
  editRole,
  getSelectOptions,
  getRolesOptions,
  getEmployeeTypes,
  addEmployee,
  getEmployees,
  getEmployeeById,
  editEmployee,
  addEventLocation,
  getEventLocation,
  addEvent,
};
