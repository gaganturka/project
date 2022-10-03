const createError = require("http-errors");
const connectToMongo = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const fs = require('fs');
const {
    AUTH_ROUTES,
    CategoryRoutes,
    WebsiteRoutes,
    ExpertAdminRoutes,
    BorhanUserAdminRoutes,
    ExpertPanelRoutes,
    AppRoutes,
    FirmRoutes
} = require("./routes");

const commonRoutes = require('./routes/common.route');

const employeeTypeRoutes = require('./routes/firm/employee-types.route');
const employeeRolesRoutes = require('./routes/firm/employee-roles.route');
const contactsRoutes = require('./routes/firm/contacts.route');
const companiesRoutes = require('./routes/firm/companies.route');
const practiceAreasRoutes = require('./routes/firm/practice-areas.route');
const activityTypesRoutes = require('./routes/firm/activity-types.route');
const contactGroupsRoutes = require('./routes/firm/contact-groups.route');
const employeesRoutes = require('./routes/firm/employees.route');
const casesRoutes = require('./routes/firm/cases.route');
const  timeEnteries = require('./routes/firm/timeEntries-route')

const cookieSession = require("cookie-session");
const passportSetup = require("./config/passport");
const passport = require("passport");
const authRoute = require("./routes/google");

// If Uploads directory does not exists then create new one
var dir = './uploads';

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
app.use(bodyParser.urlencoded({extended: false}));
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


app.use("/common", commonRoutes);

app.use("/firm", FirmRoutes);
app.use("/firm/employee-types", employeeTypeRoutes);
app.use("/firm/employee-roles", employeeRolesRoutes);
app.use("/firm/contacts", contactsRoutes);
app.use("/firm/companies", companiesRoutes);
app.use("/firm/practice-areas", practiceAreasRoutes);
app.use("/firm/activity-types", activityTypesRoutes);
app.use("/firm/contact-groups", contactGroupsRoutes);
app.use("/firm/employees", employeesRoutes);
app.use("/firm/cases", casesRoutes);
app.use("/firm/time-entry", timeEnteries)


app.get("/", (req, res) => {
    res.send("Hello Satyam");
});
// app.use(function (req, res, next) {
//   next(createError(404));
// });
//fixture user
const {fixture} = require("./fixture/fixtureUser");
fixture();
app.listen(port, () => {
    console.log(`Bohanbackend listening at http://localhost:${port}`);
});
