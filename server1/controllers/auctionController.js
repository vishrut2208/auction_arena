var express = require("express");
var router  = express.Router({mergeParams: true});
var Item = require("../models/item");
var axios = require("axios");
var slots = require("../models/slotTable")
var Bid = require("../models/bid");



function getItems(req, res){
    try{
    var now = JSON.stringify(new Date()).slice(1, 11);

    Item.find({auctionDate: now}, function(err, allitems){
        if(err){
            console.log(err);

            res.status(404);
            res.send('404: Resource Not Found');
        }else{
            res.status(200);
            res.render("campgrounds/index",{items: allitems});
            //res.send(allitems);
        }
    });
}
catch(err){
    res.status(500);
            res.send('500: Internal server error');
}
}

function postItem(req, res){
    // console.log("Req"+req)
    // console.log("File:"+req.file)
    if(req.file!=null){
        var fileName = req.file.originalname;
        var mimetype = req.file.mimetype;

    }
    else
    {
        var fileName = null;
        var mimetype = null;
    }
    var name = req.body.name;
    var imageUrl = req.body.image;
    var desc = req.body.description;
    var minimumBid = req.body.minimumBid;
    var auctionDate = req.body.auctionDate;
    var auctionSlot = req.body.auctionSlot;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newItem = {name: name, imageUrl: imageUrl, description: desc, minimumBid:minimumBid, auctionDate: auctionDate, auctionSlot: auctionSlot, author: author,fileName:fileName,mimetype:mimetype}
    axios.create({
        baseURL: "http://localhost:3001/",
        headers: { "X-Custom-Token": "super007" }
    }).post("member/postItem", newItem).then((response)=> {
        //console.log("Successsssssssssssssssss");
        if(response.data.success){
            return res.status(200)

        } else {
            res.status(500)
        }
        res.redirect("/campgrounds");
    }).catch(function (error) {
        //console.log("Errorrrrrrrrrrrrrrrrrrrrrr")
        req.flash("Backend server not responsing")
        console.log(error);
        res.send('500: Internal server error');
    });
}



function newItemPage(req, res) {
    try{
    slots.find({}, function(err, allslots){
        if(err){
            console.log(err);
            res.status(404);
            res.send('404: Resource Not Found');
        }else{
            //console.log(allslots);
            res.status(200);
            res.render("campgrounds/new",{slots: allslots});
            //res.send(allitems);
        }
    });
    }
    catch(err){
        console.log(err);
            res.status(500);
            res.send('500: Internal Sever Error');
    }
   //res.render("campgrounds/new");
}


function getSlot(req, res) {
    console.log(JSON.stringify(req.query.params))
    var auctionDate = req.query.params.auctionDate;
    console.log(auctionDate);
    try{
        slots.find({auctionDate: auctionDate, useFlag: true}, function(err, allslots){
            if(err){
                console.log(err);
            res.status(404);
            res.send('404: Resource Not Found');

            }else{
          //      console.log(auctionDate)
            //    console.log(JSON.stringify(allslots))
              //  res.render("campgrounds/new",{slots: allslots});
                res.status(200);
                res.send(allslots);

            }
        });
    }
    catch(err){
        console.log(err);
            res.status(500);
            res.send('500: Internal Sever Error');

    }


}
function getTop5(req, res) {
    var x = JSON.stringify(new Date()).slice(1,11);
    Item.find({auctionDate: x}).populate('bids', 'bidamount', null, {sort: { bidamount: -1 }}).exec(function(err, topbids){
        if(err){
            console.log(err);
        }else {
            res.send(topbids);
        }
    });
}

function getItem(req, res) {
    try{
   Item.findById(req.params.id).populate("comments").populate("bids").exec(function(err, foundItem){
       if(err){
            console.log(err);
            res.status(404);
            res.send('404: Resource Not Found');
       }else {
           res.status(200);
           res.render("campgrounds/show",{item: foundItem});
       }
   });  
}
catch(err){
    console.log(err);
            res.status(500);
            res.send('500: Internal Sever Error');
}
}

function getPicture(req,res) {
    Item.findById( req.params.id).exec(function(err,foundItem) {
        if (err) return next(err);
        console.log("Im in  getPicture")
        res.contentType(foundItem.image.contentType);
        res.send(foundItem.image.data);
    });
}

function deleteItem(req, res){
    // console.log(req.params.id);

    axios.create({
        baseURL: "http://localhost:3001/",
        headers: { "X-Custom-Token": "super007" }
    }).post("/" + req.params.id + "?_method=DELETE", req.params.id).then((response)=> {
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
            //console.log("Errorrrrrrrrrrrrrrrrrrrrrr")
            req.flash("Backend server not responsing")
            console.log(error);
            res.send(err)
    });

};






module.exports = { getItems,
                   postItem,
                   newItemPage,
                   getItem,
                   getSlot,
                   getPicture,
                   deleteItem,
                   getTop5
                }
    

