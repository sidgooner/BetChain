const mongoose = require('mongoose');

var ContestSchema = new mongoose.Schema({
   matchId: String,
   user1: String,
   user2: String,
   user1_pts: Number,
   user2_pts: Number
    
});

module.exports = mongoose.model("Contest", ContestSchema);