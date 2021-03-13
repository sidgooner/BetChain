const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    user_id: String,
    teams_selected: []
    
});

module.exports = mongoose.model("User", UserSchema);
