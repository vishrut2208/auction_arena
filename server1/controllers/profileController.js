var express = require("express");
var router  = express.Router({mergeParams: true});
var User = require("../models/user");

//Get the profile Page for the current user
function getProfile(req, res){

    console.log("i am at profile page")
    // res.render("profilesetup/show")
    // console.log(req.user._id)
    User.findById(req.user._id).exec(function(err,founduser){
        if(err){
            console.log(err);
            res.status(404);
            res.send('404: Resource Not Found');
        }
        else{
            console.log(founduser);
            res.render("profilesetup/show",{user:founduser})
        }
    })
}

function editProfile(req, res){
    console.log("Do you want to edit profile?");
    User.findById(req.user._id).exec(function(err, foundUser){
        if(err){
            console.log(err);
            res.status(404);
            res.send('404: Resource Not Found');
        }
        else{
            console.log("Let us edit now")
            res.render("profilesetup/edit", {user:foundUser});
        }
    });

}

function storeProfile(req, res){
    console.log("Updating.......")
    User.findByIdAndUpdate(req.user._id, req.body.profile).exec(function (err) {
        if(err){
            console.log(err)
            res.redirect("/profile/edit")
        }
        else{
            res.redirect("/profile")
        }
    })

}



module.exports = {getProfile,
                    editProfile,
                        storeProfile}
