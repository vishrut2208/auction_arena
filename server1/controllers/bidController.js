var express = require("express");
var router = express.Router({mergeParams: true});
var Item = require("../models/item");
var Bid = require("../models/bid");


function showBids(req, res) {
   //find campground by id
   Item.findById(req.params.id, function(err, item){
      if(err){
          console.log(err);
      } else{
          res.render("bids/new", {item: item});
      }
   });
   
}

function newBid(req, res){
   //lookup campground using id
   Item.findById(req.params.id, function(err, item) {
      if(err){
          console.log(err)
          res.redirect("/campgrounds");
      }else{
          Bid.create(req.body.bid, function(err, bid){
              if(err){
                  req.flash("error", "Something went wrong");
                  console.log(err);
              }else{
                  //add username and id to comment
                  bid.bidder.id = req.user._id;
                  bid.bidder.biddername = req.user.username;
                  //save comment
                  bid.save();
                  item.bids.push(bid);
                  item.save();
                  req.flash("success", "Successfully added bid");
                  res.redirect('/campgrounds/' + item._id);
              }
          });
      } 
   });
}


module.exports = { showBids,
                   newBid
                }