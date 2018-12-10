var Item = require("../models/item");
var slot = require("../models/slotTable");
var mongoose= require("mongoose");

function postItem(req, res){
    console.log(JSON.stringify(req.body))

    //var Item = mongoose.model("nameModel", itemSchema);
    var newItem = new Item({name: req.body.name, image: req.body.image, description : req.body.description, minimumBid:req.body.minimumBid, auctionDate:req.body.auctionDate, auctionSlot:req.body.auctionSlot , author: req.body.author});

    slot.findOneAndUpdate({startTime: req.body.auctionSlot}, {$set:{useFlag: false}}, {new: true}, (err, doc) => {
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
    

