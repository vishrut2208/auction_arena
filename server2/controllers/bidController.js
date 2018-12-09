var express = require("express");
var router = express.Router({mergeParams: true});
// var Item = require("../models/item");
var Bid = require("../models/bid");
    

module.exports = { 
     newBid(req, res){
         console.log("Im in new bid")
         try{
            Bid.create(req.body.bid, function(err, bid){
               if(err){
                     //req.flash("error", "Something went wrong");
                     console.log(err);
               }else{
                  //add username and id to comment
                     bid.bidder.id = req.user._id;
                     bid.bidder.biddername = req.user.username;
                     //save comment
                     bid.save();
                     item.bids.push(bid);
                     item.save();
                     //req.flash("success", "Successfully added bid");
                     //   res.redirect('/campgrounds/' + item._id);
                     
                     console.log(req)
                  }
         });
      }
      catch(err){
         console.log(err)
      }
   }
}