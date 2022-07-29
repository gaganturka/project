var admin = require("firebase-admin");
var serviceAccount = require('../borhan-33e53-firebase-adminsdk-rf954-937a2c2dd8.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: Config.get("db.firebaseDatabaseUrl"),
});
module.exports.admin=admin;