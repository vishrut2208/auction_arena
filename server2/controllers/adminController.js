var Item = require("../models/item");
var adminpost = require("../models/adminpost");
var mongoose= require("mongoose");
var slottable = require("../models/slotTable");

function postauctionDetail(req, res){

    //console.log(JSON.stringify(req.body));
        adminpost.create(req.body, function(err, newlyCreated){
                if(err){
                    console.log(err);
                }else{
                    //console.log(newlyCreated);
                    //var message = "Successfully setup auction details for " + newlyCreated.auctionDate;
                    //req.flash("success", message);
                    //res.redirect("/campgrounds");
                    res.send('success');
                }
        });
         var x = 0;
         var startTime = req.body.startTime;
         var auctionDate = req.body.auctionDate;
         while(x < req.body.maximumPost){

             if((parseInt(startTime.split(":")[1]) + req.body.timePerItem) < 60 ){
                 var y = parseInt(startTime.split(":")[1]) + req.body.timePerItem;
                 var endTime =  startTime.split(":")[0] +":"+ y;
             }else{
                 var y = parseInt(startTime.split(":")[1]) + req.body.timePerItem - 60;

                 if(y < 10 && ((parseInt(startTime.split(":")[0])+1)<10)){
                     var endTime = "0" + (parseInt(startTime.split(":")[0])+1) +":0"+ y;
                 }else if(y<10){
                     var endTime = (parseInt(startTime.split(":")[0])+1) +":0"+ y;

                 }else if((parseInt(startTime.split(":")[0])+1)<10){
                    var endTime = "0" + (parseInt(startTime.split(":")[0])+1) +":"+ y;
                 }else{
                     var endTime = (parseInt(startTime.split(":")[0])+1) +":"+ y;
                 }

             }
             let useFlag = true;

             var newslot = {auctionDate: auctionDate, startTime: startTime, endTime: endTime, useFlag:useFlag};
                //console.log(newslot);
             slottable.create(newslot, function(err, newlyslot){

                 if(err){
                     console.log(err);
                 }


             });

             startTime = endTime;

             x++;

         }

}

module.exports = { postauctionDetail }


