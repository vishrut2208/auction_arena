var mongoose= require("mongoose");

// Schema Setup
var slottableSchema = new mongoose.Schema({
    auctionDate: String,
    startTime: String,
    endTime: String,
    useFlag: Boolean
});

module.exports = mongoose.model("SlotTable", slottableSchema);
