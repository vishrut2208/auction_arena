var express = require("express");
var router  = express.Router({mergeParams: true});
var controller = require("../controllers/memberController")
var controller2 = require("../controllers/serverController")


//Create - add new item
router.post("/member/postItem", controller2.token_authorization ,controller.postItem);

module.exports = router;
