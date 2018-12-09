// all the middleware goes here
var Item = require("../models/item");
var Comment = require("../models/comment");
var Bid     = require("../models/bid");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Item.findById(req.params.id, function(err, foundItem){
            if(err || !foundItem){
                req.flash("error", " Campground not found");
                res.redirect("back");
             }else{
                  // does user own the campground?
            if(foundItem.author.id.equals(req.user._id)){
                next();
            }else{
                req.flash("error", "You don't have permission to do that")
                res.redirect("back");
            }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }   
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err || !foundComment){
                req.flash("error", "Sorry, that comment does not exists!");
                res.redirect("back");
            }else{
            if(foundComment.author.id.equals(req.user._id)){
                next();
            }else{
                req.flash("error", "you don't have the permission to do that");
                res.redirect("back");
            }
            }
        });
    }else{
        req.flash("error", "You have to login first");
        res.redirect("back");
    }    
}

middlewareObj.checkBidOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Bid.findById(req.params.bid_id, function(err, foundBid) {
            if(err || !foundBid){
                req.flash("error", "Sorry, that comment does not exists!");
                res.redirect("back");
            }else{
            if(foundBid.bidder.id.equals(req.user._id)){
                next();
            }else{
                req.flash("error", "you don't have the permission to do that");
                res.redirect("back");
            }
            }
        });
    }else{
        req.flash("error", "You have to login first");
        res.redirect("back");
    }    
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that")
    res.redirect("/login");
}


module.exports = middlewareObj;