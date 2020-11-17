const mongoose = require("mongoose");
const userScheme = new mongoose.Schema({
    userName: String,
    password: String,
}, { versionKey: false });
const User = mongoose.model("User", userScheme);
module.exports = User;