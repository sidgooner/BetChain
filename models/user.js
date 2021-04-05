const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    user_name: String,
    Goalkeeper:[],
    Defender:[],
    Midfielder:[],
    Attacker:[],
    captain: Number,
    viceCaptain: Number,
    matchId: Number,
    points: Number
    
});

module.exports = mongoose.model("User", UserSchema);
