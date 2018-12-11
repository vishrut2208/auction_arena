var express = require("express");
var adminpost = require("../models/adminpost");
var passport = require("passport");
var moment = require("moment");
var axios = require("axios");

function getAdminPage(req, res){
   res.render("auctionsetup/new"); 
}

function adminPost(req, res) {

    var maximumPost = req.body.maximumPost;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    var diff = moment(endTime).diff(moment(startTime), 'minutes');
    var perHour = Math.floor(diff/ maximumPost);
    var auctionDate = startTime.slice(0, 10)
    // console.log(typeof auctionDate)
    // console.log(auctionDate)
    var newItem = {
        auctionDate: auctionDate,
        maximumPost: maximumPost,
        startTime: startTime.slice(11),
        endTime: endTime.slice(11),
        timePerItem: perHour
    }

    adminpost.find({auctionDate: auctionDate}, function (err, post) {
        if (err) {
            console.log(err)
            res.redirect("auctionsetup/new");
        } else if (post.length >= 1) {
            req.flash("error", "The auction date is already setup");
            //console.log(post)
            console.log("date is already setup")
            res.redirect("auctionsetup/new");

        } else {
            axios.create({
                baseURL: "http://localhost:3001/",
                headers: {"X-Custom-Token": "super007"}
            }).post("admin/auctionsetup", newItem).then((response) => {
                //console.log("Successsssssssssssssssss");
                res.redirect("/campgrounds");
                if (response.data.success) {
                    return res.send({
                        success: true
                    })
                } else {
                    return res.send({
                        success: false
                    })
                }
            }).catch(function (error) {
                //console.log("Errorrrrrrrrrrrrrrrrrrrrrr")
                //console.log(error.response);
            });


        }
    });
}

module.exports = { getAdminPage,
                   adminPost
                }