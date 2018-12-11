var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
   username: String ,
   userType: String ,
   password: String ,
    firstName: String,
    lastName: String,
    phone:Number,
    email: String,
    address1: String,
    address2: String,
    city:String,
    state:String,
    zipcode: Number,
    dob: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);