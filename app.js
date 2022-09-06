const createError = require("http-errors");
const connectToMongo = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const fs = require("fs");
const {
  AUTH_ROUTES,
  CategoryRoutes,
  WebsiteRoutes,
  ExpertAdminRoutes,
  BorhanUserAdminRoutes,
  ExpertPanelRoutes,
  AppRoutes,
  FirmRoutes,
} = require("./routes");
const cookieSession = require("cookie-session");
const passportSetup = require("./config/passport");
const passport = require("passport");
const authRoute = require("./routes/google");
var cron = require("node-cron");
const {
  updateExpertSubscriptionEveryNight,
} = require("./controllers/ExpertPanel.Controllers");
const {
  updateUserSubscriptionEveryNight,
} = require("./controllers/WebsitePanel.Controller");
// If Uploads directory does not exists then create new one
var dir = "./uploads";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const router = express.Router();
connectToMongo();

//  router.use(express.static(__dirname, './public/'));
const app = express();
const port = process.env.PORT || 5000;
app.use("/public", express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.set('views', path.join(__dirname, 'views'));
// app.use(cors());
app.use(
  cookieSession({
    name: "sessionm",
    httpOnly: false,
    keys: ["ayush"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(passport.initialize());
app.use(passport.session());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );
app.use(cors());
app.use(express.json());
//routes available

app.use("/admin", AUTH_ROUTES);
app.use("/admin", CategoryRoutes);
app.use("/website", WebsiteRoutes);
app.use("/admin", ExpertAdminRoutes);
app.use("/admin", BorhanUserAdminRoutes);
app.use("/expert", ExpertPanelRoutes);
app.use("/auth", authRoute);
app.use("/app", AppRoutes);
app.use("/firm", FirmRoutes);
app.get("/", (req, res) => {
  res.send("Hello Satyam");
});
// app.use(function (req, res, next) {
//   next(createError(404));
// });
//fixture user
cron.schedule("0 1 * * *", async () => {
  await updateExpertSubscriptionEveryNight();
  await updateUserSubscriptionEveryNight();
});
const { fixture } = require("./fixture/fixtureUser");
fixture();

app.listen(port, () => {
  console.log(`Bohanbackend listening at http://localhost:${port}`);
});
