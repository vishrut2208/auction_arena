var express = require("express");
var router  = express.Router({mergeParams: true});
var UserProfile = require("../models/user");
var middleware = require("../middleware");
var controller = require("../controllers/profileController");


//Show profile
router.get("/",middleware.isLoggedIn, controller.getProfile)

//go to edit profile
router.get("/edit", middleware.isLoggedIn, controller.editProfile)


router.put("/edit", middleware.isLoggedIn, controller.storeProfile)

module.exports = router