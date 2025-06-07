const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Login-Register");

//Check connection
connect.then(() => {
    console.log("Database connected successfully!");

}).catch(() => {
    console.log("Database cannot be connected!");
});

const destinationSchema = new mongoose.Schema({
    category: String,
    link_name: String,
    name: String,
    image: String,
    ticket_info: String,
    idea: String,
    dining_info: String,
    room_info: String,
    food_info: String,
    payment_info: String,
    seat_info: {
        type: Number,
        required: false,
        min: 1
    },
    luggage_info: String,
    petrol_info: String,
    engine_info: String,
    distance_info: String,
    reserve_info: String,
    duration: String,
    rating: String,
    short_location: String,
    location: String,
    location_link: String,
    official_website: String,
    official_menu: String,
    priceRM: String,
    price: {
        type: Number,
        required: false,
    },
    description: String,
    operating_hour: String,
    num_person: {
        type: Number,
        required: false,
        min: 1
    },
    favourite: {
        type: Boolean,
        default: false
    },
    planner_date: {
        type: String,
        required: false
    }

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