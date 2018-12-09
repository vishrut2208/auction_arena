var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var controller = require("../controllers/registrationController")

// Root Route
router.get("/", controller.getFrontPage);


// show register form
router.get("/register", controller.getRegisterPage);

//handle sign up logic
router.post("/register", controller.createUser);


//show login form

router.get("/login", controller.getLogin);

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        successFlash: true,
        failureRedirect: "/login",
        failureFlash: true
    
    }),function(req, res){
        console.log(req.body);
});

// logout route

router.get("/logout", controller.logout);

module.exports = router;