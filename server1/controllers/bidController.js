var express = require("express");
var router = express.Router({mergeParams: true});
var Item = require("../models/item");
//var Bid = require("../models/bid");
const   RedisSMQ = require("rsmq");
var rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );

rsmq.listQueues( function (err, queues) {
	if( err ){
		console.error( err )
		return
	}
    console.log("Active queues: " + queues.join( "," ) )
    if (queues.indexOf("bidqueue") > -1) {
        console.log("using Previous queue")
    } else {
        console.log("creating Queue")
        rsmq.createQueue({qname:"bidqueue",maxsize:1024}, function (err, resp) {
            if (resp===1) {
                console.log("queue created")
            }
            if(err){
                console.log(err)
            }
        });
    }
});
    


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
        //   Bid.create(req.body.bid, function(err, bid){
        //       if(err){
        //           req.flash("error", "Something went wrong");
        //           console.log(err);
        //       }else{
                  //add username and id to comment
                //   bid.bidder.id = req.user._id;
                //   bid.bidder.biddername = req.user.username;
                //   //save comment
                //   bid.save();
                //   item.bids.push(bid);
                //   item.save();
                //   req.flash("success", "Successfully added bid");
                //   res.redirect('/campgrounds/' + item._id);
                //   });
    //   } 
                rsmq.sendMessage({qname:"bidqueue", message:req.body}, function (err, resp) {
                    if (resp) {
                        req.flash("success", "Bid placed in queue");
                        res.redirect('/campgrounds/' + item._id);
                    }
                    if(err){
                        req.flash("error", "Error in pushing bid");
                    }
                }); 
                
              }
        
   });
}


module.exports = { showBids,
                   newBid
                }