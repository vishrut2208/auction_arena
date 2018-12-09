var express = require("express");
var router  = express.Router({mergeParams: true});
var Item = require("../models/item");
var axios = require("axios");
var slots = require("../models/slotTable")



function getItems(req, res){
    
    Item.find({}, function(err, allitems){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{items: allitems});
            //res.send(allitems);
        }
    });
}

function postItem(req, res){

    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var minimumBid = req.body.minimumBid;
    var auctionDate = req.body.auctionDate;
    var auctionSlot = req.body.auctionSlot;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newItem = {name: name, image: image, description: desc, minimumBid:minimumBid, auctionDate: auctionDate, auctionSlot: auctionSlot, author: author}

    console.log(newItem)
    axios.create({
        baseURL: "http://localhost:3001/",
        headers: { "X-Custom-Token": "super007" }
    }).post("member/postItem", newItem).then((response)=> {
        console.log("Successsssssssssssssssss");
        res.redirect("/campgrounds");
        if(response.data.success){
            return res.send({
                success : true

            })

        } else {
            return res.send({
                success : false
            })
        }
    }).catch(function (error) {
        console.log("Errorrrrrrrrrrrrrrrrrrrrrr")
        console.log(error.response);
    });

}

function newItemPage(req, res) {

    slots.find({}, function(err, allslots){
        if(err){
            console.log(err);
        }else{
            //console.log(allslots);
            res.render("campgrounds/new",{slots: allslots});
            //res.send(allitems);
        }
    });
   //res.render("campgrounds/new");
}

function getSlot(req, res) {
    //console.log(JSON.stringify(req.query.params))
    var auctionDate = req.query.params.auctionDate;
    //console.log(auctionDate);
    slots.find({auctionDate: auctionDate, useFlag: true}, function(err, allslots){
        if(err){
            console.log(err);
        }else{
      //      console.log(auctionDate)
        //    console.log(JSON.stringify(allslots))
          //  res.render("campgrounds/new",{slots: allslots});
            res.send(allslots);
        }
    });

}

function getItem(req, res) {
   Item.findById(req.params.id).populate("comments").populate("bids").exec(function(err, foundItem){
       if(err){
            console.log(err);
       }else {
           console.log(foundItem)
           res.render("campgrounds/show",{item: foundItem});
       }
   });  
}


module.exports = { getItems,
                   postItem,
                   newItemPage,
                   getItem,
                   getSlot
                }
    

