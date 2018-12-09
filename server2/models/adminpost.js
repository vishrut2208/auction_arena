var mongoose= require("mongoose");

// Schema Setup
var adminSetupSchema = new mongoose.Schema({
    maximumPost: Number,
    auctionDate: String,
    startTime: String,
    endTime: String,
    timePerItem: Number
});

module.exports = mongoose.model("AuctionSetup", adminSetupSchema);
