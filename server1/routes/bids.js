var express = require("express");
var router = express.Router({mergeParams: true});
var Item = require("../models/item");
var Bid = require("../models/bid");
var middleware = require("../middleware");
var controller = require("../controllers/bidController")

// Bids New

router.get("/new", middleware.isLoggedIn, controller.showBids);


//Create Bid

router.post("/", middleware.isLoggedIn, controller.newBid);

//Comment destroy 

router.delete("/:bid_id",middleware.checkBidOwnership ,function(req, res){
    Bid.findByIdAndRemove(req.params.bid_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });    
});

module.exports = router;
