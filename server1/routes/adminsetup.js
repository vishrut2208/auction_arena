var express = require("express");
var router  = express.Router({mergeParams: true});
var Item = require("../models/item");
var middleware = require("../middleware");
var controller = require("../controllers/adminController")
var cacheware = require("../middleware/cacheresponse").data

//Index- show all campgrounds
router.get("/new", controller.getAdminPage);

//Create - add new campground
router.post("/",middleware.isLoggedIn, controller.adminPost);


module.exports = router;