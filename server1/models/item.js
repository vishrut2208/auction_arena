var mongoose= require("mongoose");

// Schema Setup
var itemSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    imageTag: String,
    minimumBid: Number,
    auctionDate: String,
    auctionSlot: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    
    bids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bid"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]

});

module.exports = mongoose.model("Item", itemSchema);
