import multer from "multer";
import responseMessages from "../resources/response.json";

const Boom = require("boom");
import universalFunctions from "../utils/universalFunctions";
const { Config } = require("../config");

let upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname); //use Date.now() for unique file keys
    },
  }),
  limits: {
    fileSize: "50mb",
  },
}).array("files");

module.exports = {
  Upload: async (req, res) => {
    try {
      // console.log("rohitsir")
      await upload(req, res, (error, files) => {
        if (error) {
          return universalFunctions.sendError(error, res);
        }
        if (req.files.length <= 0) {
          throw Boom.badRequest(responseMessages.UPLOAD_FILE);
        }
        req.files &&
          req.files.map((val) => {
            // val.path = `${Config.get("serverUrl")}${val.path}`;
            val.path = `${Config.BACKEND_URL}/${val.path}`;
          });
        // console.log("satyamtomar",req.file)
        return universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: responseMessages.FILES_UPLOAD_SUCCESSFULL,
            data: req.files,
          },
          res
        );
      });
    } catch (error) {
      return universalFunctions.sendError(error, res);
    }
  },
};
