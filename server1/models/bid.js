var mongoose = require("mongoose");

var bidSchema = mongoose.Schema({
    bidamount: Number,
    bidder: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        biddername: String
    },
    
     
}, {timestamps: true});

module.exports = mongoose.model("Bid", bidSchema);