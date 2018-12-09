var express = require("express");
var router  = express.Router({mergeParams: true});
var controller = require("../controllers/adminController")
var controller2 = require("../controllers/serverController")


//Create - add new item
router.post("/auctionsetup", controller2.token_authorization ,controller.postauctionDetail);

module.exports = router;