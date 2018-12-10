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
   try{
   Item.findById(req.params.id, function(err, item) {
      if(err){
          console.log(err)
          res.redirect("/campgrounds");
          res.send(500)
      }else{    
            let payload={
                bidAmount:req.body.bid.bidamount,
                user_id:req.user._id,
                username:req.user.username,
                item_id:req.params.id
            };
            rsmq.sendMessage({qname:"bidqueue", message:JSON.stringify(payload)}, function (err, resp) {
                if (resp) {
                    req.flash("success", "Bid placed in queue");
                    res.redirect('/campgrounds/' + item._id);
                    res.send(200)
                }
                else if(err){
                    req.flash("error", "Error in pushing bid");
                    console.log("err")
                    res.redirect("/campgrounds");
                    res.send(500)
                }
                else{
                    req.flash("error", "Error in pushing bid...Please try again");
                    console.log("err")
                    res.redirect("/campgrounds");
                    res.send(500)
                }
            }); 
            
                
        }
        
   });
}
catch(err){
    req.flash("error", "Error in pushing bid...Please try again");
    console.log(err)
    res.send(500)
}
}


module.exports = { showBids,
                   newBid
                }