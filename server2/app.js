var express     = require("express"),
     app        = express(),
     bodyParser = require("body-parser"),
     mongoose   = require("mongoose"),
     methodOverride = require("method-override"),
     item = require("./models/item"),
     Comment    = require("./models/comment"),
     User       = require("./models/user"),
     Bid        = require("./models/bid"),
     auctionsetup = require("./models/adminpost"),
     slottable  = require("./models/slotTable"),
     //seedDB     = require("../seeds"),
     moment       = require("moment");
     

var itemRoutes = require("./routes/items");
var adminRoutes = require("./routes/adminRoute")

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.locals.moment = moment;
//seedDB(); //seed for the database

app.use("/admin",adminRoutes);
app.use("/",itemRoutes);



app.listen("3001","127.0.0.1", function(){
  
  console.log("The AuctionService Backend Server Has Started!");
});