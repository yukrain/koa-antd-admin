var mongoose = require("./db");
var userSchema = new mongoose.Schema({
    username : {type : String },
    email : String
},{ collection: 'center_user', versionKey: false });

var User = mongoose.model("User" ,userSchema);

module.exports = User;