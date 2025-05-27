const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./src/config");

const app = express();

//Convert data into json format
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static("public"));
app.use(express.static("src"));
app.use(express.static("img"));
app.use(express.static("views"));

//use EJS as the view engine
app.set('view engine', 'ejs');

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get("/", (req, res) => {
  res.render("index.ejs");
  console.log("Welcome to Home Page");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

//Register User
app.post("/signup", async(req, res) => {
    console.log("POST /signup route hit"); // Add this line

    const data = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    const existingUser = await collection.findOne({email: data.email});

    if (existingUser) {
        res.send("User already exists. Please choose a different email");

    } else {
        try {
            //hash the password using bcrypt
            const saltRounds = 10; //Numnber of salt round for bcrypt
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);

            data.password = hashedPassword //Replace the hash password with original password

            const userData = await collection.insertMany(data);
            console.log("User saved:", userData);

            res.render("main-page.ejs");
            
          } catch (err) {
            console.error("Error inserting data:", err);
            res.status(500).send("Error saving user");
        }
    }

});

// Login User
app.post("/login", async(req, res) => {
    try {
        const check = await collection.findOne({name: req.body.username});

        if (!check) {
            res.send("User name cannot found!");
        }

        //Compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);

        if (isPasswordMatch) {
            res.render("main-page.ejs");
        } else {
            req.send("Password Incorrect!");
        }

    } catch {
        res.send("Wrong Details");

    }
})

//User Profile Settingd
app.get("/profile-settings-pg4", (req, res) => {
    res.render("profile-settings-pg4.ejs");
})

//Main Home Page
app.get("/main-page", (req, res) => {
    res.render("main-page.ejs");
});

//User Favourite List
app.get("/favourite-pg16", (req, res) => {
    res.render("favourite-pg16.ejs");
});

//User travel plan history
app.get("/history-pg17", (req, res) => {
    res.render("history-pg17.ejs");
});

//Getting Weather Information
app.get("/weather-pg23", (req, res) => {
    res.render("weather-pg23.ejs");
});

//Carbon Calculator
app.get("/carbon_calculator", (req, res) => {
    res.render("carbon_calculator.ejs");
});

//Get to Search Page
app.get("/search", (req, res) => {
    res.render("search.ejs");
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});
