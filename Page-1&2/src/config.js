const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Login-Register");

//Check connection
connect.then(() => {
    console.log("Database connected successfully!");

}).catch(() => {
    console.log("Database cannot be connected!");
});

//Create a schema
const LoginRegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

//Collection Part
const collection = new mongoose.model("User", LoginRegisterSchema);

module.exports = collection;