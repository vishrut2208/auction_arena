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
     comp = require('compression')
// const RedisSMQ = require("rsmq");
// var rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq", realtime:true} );
var RSMQWorker = require( "rsmq-worker" );
var worker = new RSMQWorker( "bidqueue",{maxReceiveCount:1} );



var itemRoutes = require("./routes/items");
var adminRoutes = require("./routes/adminRoute")
const biController = require("./controllers/bidController")

mongoose.connect("mongodb+srv://admin:admin@cluster0-oxtvz.mongodb.net/online_auction?retryWrites=true");
app.use(comp());
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

  // var rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq", realtime:true} );
  // while(true){
  // rsmq.popMessage({qname:"bidqueue"}, function (err, resp) {
  //   if(err){
  //     console.log(err)
  //   }
  //   if (resp.id) {
  //     console.log("Message received.", resp)

  //     // rsmq.deleteMessage({qname:"myqueueq", id:resp.id}, function (err, resp) {
  //     //   if (resp===1) {
  //     //     console.log("Message deleted.")	
  //     //   }
  //     //   else {
  //     //     console.log("Message not found.")
  //     //   }
  //     // });
  //   }
  //   else {
  //     console.log("No messages for me...")
  //   }
  // });
//}
worker.on( "message", function( msg, next, id ){
  // process your message
  console.log("Message id : " + id);
  console.log(msg);
  // rsmq.deleteMessage({qname:"bidqueue", id:id}, function (err, resp) {
  //   if (resp===1) {
  //     console.log("Message deleted.")	
  //   }
  //   else {
  //     console.log("Message not found.")
  //   }
  //   if(err)
  //     console.log(err)
  // });
  biController.newBid(msg)
  
  // next()
});
worker.on('error', function( err, msg ){
  console.log( "ERROR", err, msg.id );
});
worker.start();
});