const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
const {
  AUTH_ROUTES,
  CategoryRoutes,
  HomeWebsiteRoutes,
  ExpertAdminRoutes,
  BorhanUserAdminRoutes,
} = require("./routes");

// require("./")
const router = express.Router();
connectToMongo();

//  router.use(express.static(__dirname, './public/'));
const app = express();
const port = process.env.PORT || 5000;
app.use("/public", express.static("public"));
app.use(cors());

app.use(express.json());
//routes available

app.use("/admin", AUTH_ROUTES);
app.use("/admin", CategoryRoutes);
app.use("/website",HomeWebsiteRoutes);
app.use("/admin",ExpertAdminRoutes);
app.use("/admin",BorhanUserAdminRoutes)
app.get("/", (req, res) => {
  res.send("Hello Satyam");
});

//fixture user
const { fixture } = require("./fixture/fixtureUser");
fixture();
app.listen(port, () => {
  console.log(`Bohanbackend listening at http://localhost:${port}`);
});
