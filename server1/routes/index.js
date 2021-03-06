var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var controller = require("../controllers/registrationController")
var cacheware = require("../middleware/cacheresponse").data

// Root Route
router.get("/", controller.getFrontPage);


// show register form
router.get("/register", controller.getRegisterPage);

//handle sign up logic
router.post("/register", controller.createUser);


//show login form

router.get("/login", controller.getLogin);

// router.get("/profile", controller.getLogin);

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        successFlash: true,
        failureRedirect: "/login",
        failureFlash: true
    
    }),function(req, res){
        console.log(req.body);
});

router.get("/contact", controller.getContact);



// logout route

router.get("/logout", controller.logout);
// router.get("*", function(req, res){
//     res.status(404);
//     res.send('404: Resource Not Found');
//   });

module.exports = router;