var express = require("express");
var User = require("../models/user");
var passport = require("passport");
var axios = require("axios");

function getFrontPage(req, res){
   res.render("landing"); 
}


function getRegisterPage(req, res) {
   res.render("register"); 
}

function createUser(req, res) {
     if(req.body.username === "vis"){
        var newUser = new User({username: req.body.username, userType: "Admin"});
    }else{
        newUser = new User({username: req.body.username, userType: "General"});
    }
    User.register(newUser, req.body.password, function(err, user){
       if(err){
           req.flash("error", err.message);
           return res.render("register")
       } 
       passport.authenticate("local")(req, res,function(){
           req.flash("success", "Welcome to YelpCamp " + user.username);
           res.redirect("/campgrounds");
       });
    });
}

function getLogin(req, res){
    res.render("login");
}

function logout(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
}


module.exports = { getFrontPage,
                   getRegisterPage,
                   createUser,
                   getLogin,
                   logout
                }

