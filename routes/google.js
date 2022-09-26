const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/userdashboard";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
        cookies: req.cookies
    });
  }else{
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});


router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});
router.get("/logout", (req, res) => {
  
  req.logout();
  res.redirect(CLIENT_URL);
  res.status(401).json({
    success: true,
    message: "successfull logout",
    user:req.user
  });

});

router.get("/google", passport.authenticate("google", { scope: [ 'email','profile'] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
router.get("/facebook", passport.authenticate('facebook'));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);


module.exports = router