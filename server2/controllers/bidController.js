var express = require("express");
var router = express.Router({mergeParams: true});
var Item = require("../models/item");
var Bid = require("../models/bid");


module.exports = {
    newBid(req, res){
        console.log("Im in new bid")
        obj = JSON.parse(req);
        console.log("Bid Amount:"+obj.bidAmount)
        console.log("UserId:"+obj.user_id)
        console.log("UserName:"+obj.username)
        console.log("Item_id:"+obj.item_id)
        try{
            Bid.find({bidamount: {$gt: parseInt(obj.bidAmount)}}, function(err, higherbid){
                if(err){
                    console.log(err);
                }else if(higherbid.length ==0){

                        console.log("posting the bid");
                        Item.findById(obj.item_id, function (err, item) {
                            if (err) {
                                console.log(err)
                            } else {
                                Bid.create({bidamount: parseInt(obj.bidAmount)}, function (err, bid) {
                                    if (err) {
                                        //req.flash("error", "Something went wrong");
                                        console.log(err);
                                    } else {
                                        //add username and id to comment
                                        bid.bidder.id = obj.user_id;
                                        bid.bidder.biddername = obj.username;
                                        //save comment
                                        bid.save();
                                        item.bids.push(bid);
                                        item.save();
                                        //req.flash("success", "Successfully added bid");
                                        //res.redirect('/campgrounds/' + item._id);
                                        console.log("Bid Amount:" + parseInt(obj.bidAmount))
                                        console.log("successfully placed into DB")
                                    }
                                });
                            }
                        });
                }else{
                    console.log("Bid Rejected");
                }

            });
        }
        catch(err){
            console.log(err)
        }
    }
}