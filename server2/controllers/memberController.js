var Item = require("../models/item");
var slot = require("../models/slotTable");
var mongoose= require("mongoose");
var fs = require("fs");

function postItem(req, res){
    // console.log(JSON.stringify(req.body.auctionSlot))

    //var Item = mongoose.model("nameModel", itemSchema);
    //var newItem = new Item({name: req.body.name, image: req.body.image, description : req.body.description, minimumBid:req.body.minimumBid, auctionDate:req.body.auctionDate, auctionSlot:req.body.auctionSlot , author: req.body.author});
    // console.log(req.body)
    var path = "../assets/images/"+req.body.fileName;
    // console.log(path)
    var newItem = new Item();
    //var path = String(req.body.path).replace("\\"+"/");
    // console.log(path)
    // console.log(fs.readFileSync(req.body.path))
    newItem.name= req.body.name;
    newItem.imageUrl=req.body.imageUrl;
    newItem.image.data = fs.readFileSync(path);
    newItem.image.contentType=req.body.mimetype;
    newItem.description = req.body.description;
    newItem.minimumBid=req.body.minimumBid;
    newItem.auctionDate=req.body.auctionDate;
    newItem.auctionSlot=req.body.auctionSlot; 
    newItem.author=req.body.author;
    // console.log(JSON.stringify(req.body.auctionSlot).slice(1,6))
    // console.log(JSON.stringify(req.body.auctionSlot).slice(7,12))
    slot.findOneAndUpdate({startTime: JSON.stringify(req.body.auctionSlot).slice(1,6)}, {$set:{useFlag: false}}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }

        //console.log(doc);
    });

    Item.create(newItem, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            //console.log(newlyCreated);
            res.send('success');
        }
    });
}

function deleteItem(req, res){

    console.log("i am here in server2")

    console.log(JSON.stringify(req.params.id));

    Item.findByIdAndRemove(req.params.id, function(err){
       if(err){
           console.log(err);
        } else {
           res.send('success');
        }
    });
}

module.exports = { postItem,
                   deleteItem}
    

