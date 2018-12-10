var   express     = require("express"),
        app        = express(),
        bodyParser = require("body-parser"),
        mongoose   = require("mongoose"),
        flash      = require("connect-flash"),
        methodOverride = require("method-override"),
        item = require("./models/item"),
        Comment    = require("./models/comment"),
        User       = require("./models/user"),
        Bid        = require("./models/bid"),
        auctionsetup = require("./models/adminpost"),
        slottable  = require("./models/slotTable"),
        //seedDB     = require("./seeds"),
        passport   = require("passport"),
        LocalStrategy = require("passport-local"),
        moment       = require("moment"),
        comp = require('compression');

//requiring Routes
const   commentRoutes    = require("./routes/comments"),
        itemRoutes = require("./routes/items"),
        indexRoutes       = require("./routes/index"),
        bidRoutes         = require("./routes/bids"),
        adminsetupRoutes= require("./routes/adminsetup"),
        userRoutes = require("./routes/userProfile");

//         const   RedisSMQ = require("rsmq");
// var rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq", realtime:true} );


//mongoose.connect("mongodb+srv://admin:admin@cluster0-oxtvz.mongodb.net/online_auction?retryWrites=true");
mongoose.connect("mongodb://localhost:27017/auction_arena");
app.use(comp());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = moment;
//seedDB(); //seed for the database


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "i am the dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
// app.use(function(req, res, next){
//     res.status(404);
  
//     // respond with html page
//     if (req.accepts('html')) {
//       res.render('404', { url: req.url });
//       return;
//     }
  
//     // respond with json
//     if (req.accepts('json')) {
//       res.send({ error: 'Not found' });
//       return;
//     }
  
//     // default to plain-text. send()
//     res.type('txt').send('Not found');
//   });

app.use("/",indexRoutes);
app.use("/contact", indexRoutes)
app.use("/profile",userRoutes);
app.use("/campgrounds",itemRoutes);
app.use("/auctionsetup", adminsetupRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds/:id/bids",bidRoutes);
app.use(function(req, res, next) {
    res.status(404);
    res.send('404: Resource Not Found');
});

app.listen("3000", "127.0.0.1", function(){
   console.log("The AuctionService Frontend Server Has Started!")

    
});