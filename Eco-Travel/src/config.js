const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Login-Register");

//Check connection
connect.then(() => {
    console.log("Database connected successfully!");

}).catch(() => {
    console.log("Database cannot be connected!");
});

const destinationSchema = new mongoose.Schema({
    name: String,
    image: String,
    duration: String,
    rating: String,
    location: String,
    price: String,
    description: String,
    operating_hour: String
});

const plannerSchema = new mongoose.Schema({
    date: String,
    destination: [destinationSchema]
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
    },

    favourite: [destinationSchema],

    planner: [plannerSchema]
});

//Collection Part
const collection = new mongoose.model("User", LoginRegisterSchema);

module.exports = collection;