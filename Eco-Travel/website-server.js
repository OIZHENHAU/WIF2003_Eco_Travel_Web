const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./src/config");
const session = require('express-session');
const destinations = require("./src/destination_library");
const accomodations = require("./src/accomodation_library");
const restaurants = require("./src/restaurant_library");
const transportations = require("./src/transportation_library");
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

//Convert data into json format
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));


app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/src"));
app.use(express.static(__dirname + "/img"));
app.use(express.static(__dirname + "/views"));

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

function getRandomDestinations(obj, count) {
  const all = Object.values(obj);
  const shuffled = all.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'img')); // your folder
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + unique + ext);
  }
});

const upload = multer({ storage });

app.post('/api/upload-profile-image', upload.single('profileImage'), async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  const imgPath = '/' + file.filename;
  
  try {
    await collection.findByIdAndUpdate(req.session.userId, {
      image: imgPath
    });
    res.json({ success: true, imageUrl: imgPath });
  } catch (err) {
    console.error('DB update error:', err);
    res.status(500).json({ message: 'DB error' });
  }
});

app.use(passport.initialize());
app.use(passport.session());

// Serialize and deserialize
passport.serializeUser((user, done) => {
  done(null, user._id.toString()); // Store user ID in session
});

passport.deserializeUser(async (id, done) => {
  const user = await collection.findById(id);
  done(null, user);
});

// Configure Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  passReqToCallback: true
},
async (req, accessToken, refreshToken, profile, done) => {
  try {
    let user = await collection.findOne({ email: profile.emails[0].value });

    if (!user) {
      user = await collection.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: "GOOGLE_OAUTH", // Dummy password
        image: profile.photos[0].value
      });
    }

    console.log("User Details Google", user);
    //req.session.userId = user._id;
    //console.log("User Session ID", req.session.userId);

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Start Google auth
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


app.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/"
  }),
  (req, res) => {
    // Set session.userId after successful login
    req.session.userId = req.user._id;
    res.redirect("/main-page");
  }
);


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}


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
        return res.send("User already exists. Please choose a different email");

    } else {
        try {
            //hash the password using bcrypt
            const saltRounds = 10; //Numnber of salt round for bcrypt
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);

            data.password = hashedPassword //Replace the hash password with original password

            const userData = await collection.insertMany(data);

            console.log("User saved:", userData);

            req.session.userId = userData[0]._id;
            console.log("User Session: ", req.session.userId);
            res.render("main-page.ejs", {
                destinations: Object.values(destinations),
                accomodations: Object.values(accomodations),
                restaurants: Object.values(restaurants),
                transportations: Object.values(transportations),
            });
            
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
            return res.send("User name cannot found!"); // Added return
        }

        //Compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);

        if (isPasswordMatch) {
            console.log("Current User Login: ", check._id);
            req.session.userId = check._id;
            return res.render("main-page.ejs", { // Added return
                destinations: Object.values(destinations),
                accomodations: Object.values(accomodations),
                restaurants: Object.values(restaurants),
                transportations: Object.values(transportations)
            });

        } else {
            return res.send("Password Incorrect!"); // Fixed typo: req.send -> res.send, added return
        }

    } catch (error) { // Added error parameter
        console.error("Login error:", error); // Better error logging
        return res.send("Wrong Details"); // Added return
    }
});

//User Profile Settingd
app.get("/profile-settings-pg4", async (req, res) => {
    try {
        const userId = req.user ? req.user._id : req.session.userId;

        console.log("User ID in Profile Page", userId);
        if (!userId) return res.status(401).send("Not Authenticated");

        const userProfileData = await collection.findById(userId);
        //console.log("User ID in Profile Page", req.session.userId);
        //const userProfileData = await collection.findById(req.session.userId);
        console.log("User Profile Settings: ", userProfileData);

        if (!userProfileData) {
            return res.status(404).send("User Not Found!");
        }

        const profileImage = userProfileData.image;
        console.log("Profile Image: ", profileImage);
        
        res.render("profile-settings-pg4.ejs", { user: userProfileData, image: profileImage });

    } catch (err) {
        console.error("Error loading user profile:", err);
        res.status(500).send("Server error");
    }
})

//User Update Profile
app.post("/api/update-profile", async (req, res) => {
    try {
        const userId = req.session.userId;
        console.log("Updating profile for user ID:", req.session.userId);

        const existingUser = await collection.findById(userId);
        if (!existingUser) {
            return res.status(404).send("User not found");
        }

        // 2. Prepare updated data, fallback to existing values
        const updatedData = {
            first_name: req.body.firstName?.trim() || existingUser.first_name,
            last_name: req.body.lastName?.trim() || existingUser.last_name,
            mobile: req.body.mobile?.trim() || existingUser.mobile,
            gender: req.body.gender?.trim() || existingUser.gender,
            email: req.body.email?.trim() || existingUser.email,
            address: req.body.address?.trim() || existingUser.address,
        };

        console.log("Updated Data: ", updatedData);

        // Only update password if a new one is entered
        if (req.body.password && req.body.password.trim() !== "") {
            //hash the password using bcrypt
            const saltRounds = 10; //Numnber of salt round for bcrypt
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            updatedData.password = hashedPassword; // Consider hashing it!
        }

        console.log("Data After Password Updated: ", updatedData);

        const updatedUser = await collection.findByIdAndUpdate(
            userId,
            { $set: updatedData },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        console.log("Profile updated successfully:", updatedUser);

        req.session.user = updatedUser;

        // Redirect back to the settings page with updated info
        res.render("profile-settings-pg4.ejs", { user: updatedUser });

    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).send("Internal Server Error");
    }
});

const nodemailer = require('nodemailer');

// Route to handle subscription
app.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    // Set up transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Email content
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thanks for Subscribing to Eco Travel!',
        text: `Hello,

Thank you for subscribing to our Eco Travel monthly blog! 🌍✈️

We'll keep you updated with the latest travel tips, destinations, and tours.

Stay tuned!
– The Eco Travel Team`,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Subscription email sent to ${email}`);
        //res.send("Thank you for subscribing! Check your email.");
        res.render("main-page.ejs");

    } catch (err) {
        console.error("Error sending email:", err);
        //res.status(500).send("There was an error sending the subscription email.");
        //res.redirect('/main-page?subscribed=fail');
    }
});


//Main Home Page
app.get("/main-page", (req, res) => {
    res.render("main-page.ejs");
});

//User Favourite List
app.get("/favourite-pg16", async (req, res) => {
    const userId = req.session.userId;

    try {
        const user = await collection.findById(userId);
        const favourite = user && user.favourite ? Object.values(user.favourite) : [];

        res.render("favourite-pg16.ejs", {favourite});

    } catch (err) {
        console.error("Error retrieving search result:", err);
        res.status(500).send("Server error");
    }

});

//User travel plan history
app.get("/history-pg17", async (req, res) => {
    const today = new Date();
    const dateOptions = {day: '2-digit', month: 'long', year: 'numeric'};
    const weekDayOptions = {weekday: 'long'};

    const formattedDate = today.toLocaleDateString('en-GB', dateOptions);
    const formattedWeekDay = today.toLocaleDateString('en-GB', weekDayOptions);

    const userId = req.session.userId;

    try {
        const user = await collection.findById(userId);

        if (!user) {
            return res.status(404).send("User not found!");
        }

        const favourite = user && user.favourite ? Object.values(user.favourite) : [];

        const plannerEntry = user.planner.find(p => p.date === formattedDate);

        const plannerDestination = user && plannerEntry ? Object.values(plannerEntry.destination) : [];

        console.log("The planner destination: ", plannerDestination);

        res.render("history-pg17.ejs", {
            todayDateFormatted: formattedDate, 
            todayWeekDayFormatted: formattedWeekDay,
            plannerDestination: plannerDestination, 
            favourite: favourite
        });

    } catch (err) {
        console.error("Error retrieving planner result:", err);
        res.status(500).send("Server error");
    }

});

app.post('/log-selected-date', async (req, res) => {
    const { date, weekDay } = req.body;

    if (!date) {
        return res.status(400).send("No date provided");
    }

    console.log("User clicked date:", date);

    const userId = req.session.userId;

    try {
        const user = await collection.findById(userId);

        if (!user) {
            return res.status(404).send("User not found!");
        }

        const favourite = user && user.favourite ? Object.values(user.favourite) : [];

        const plannerEntry = user.planner.find(p => p.date === date);

        const plannerDestination = user && plannerEntry ? Object.values(plannerEntry.destination) : [];

        console.log("The planner destination: ", plannerDestination);

        res.render("history-pg17.ejs", { 
            todayDateFormatted: date, 
            todayWeekDayFormatted: weekDay,
            plannerDestination: plannerDestination, 
            favourite: favourite });

    } catch (err) {
        console.error("Error retrieving planner result:", err);
        res.status(500).send("Server error");
    }

});


//Getting Weather Information
app.get("/weather-pg23", (req, res) => {
    res.render("weather-pg23.ejs");
});


//Carbon Calculator
app.get("/carbon_calculator", (req, res) => {
    res.render("carbon_calculator.ejs");
});

//Redirect to Delete Account Page
app.get("/delete-account", (req, res) => {
    res.render("delete-account-pg5.ejs");
});

//Delete Account
app.post('/delete-my-account', async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        await collection.findByIdAndDelete(userId);
        req.session.destroy(); // Clear the session after deleting the user
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

//Log Out Account
app.get("/logout-account", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
        console.error(err);
        return res.redirect('profile-settings-pg4.ejs'); // stay if error
        }
        res.clearCookie('connect.sid'); // optional: clear cookie
        res.render('index.ejs'); // go to login/register page
    });
});

//Get Popular Tourist
app.get("/get-info/:category/:place", async (req, res) => {
    const category = req.params.category;
    const userId = req.session.userId;
    
    if (category === "destination") {
        const destination = destinations[req.params.place];

        if (destination) {
            try {
                const user = await collection.findById(userId);
                const favourite = user && user.favourite ? Object.values(user.favourite) : [];

                res.render("destination-pg7.ejs", {destination, favourite});

            } catch (err) {
                console.log("Error adding to favourites: ", err);
                res.status(500).send("Server error");
            }

        } else {
            res.status(404).send("Destination not found");
        }

    } else if (category === "accomodation") {
        const accomodation = accomodations[req.params.place];

        if (accomodation) {
            try {
                const user = await collection.findById(userId);
                const favourite = user && user.favourite ? Object.values(user.favourite) : [];

                res.render("accomodation-pg11.ejs", {accomodation, favourite});

            } catch (err) {
                console.log("Error adding to favourites: ", err);
                res.status(500).send("Server error");
            }

        } else {
            res.status(404).send("Destination not found");
        }

    } else if (category === "transportation") {
        const transportation = transportations[req.params.place];

        if (transportation) {

            try {
                const user = await collection.findById(userId);
                const favourite = user && user.favourite ? Object.values(user.favourite) : [];

                res.render("chosen_car-pg15.ejs", {transportation, favourite});

            } catch (err) {
                console.log("Error adding to favourites: ", err);
                res.status(500).send("Server error");
            }

        } else {
            res.status(404).send("Destination not found");
        }

    } else if (category === "restaurant") {
        const restaurant = restaurants[req.params.place];
        console.log(restaurant);

        if (restaurant) {

            try {
                const user = await collection.findById(userId);
                const favourite = user && user.favourite ? Object.values(user.favourite) : [];

                res.render("restaurant-pg12.ejs", {restaurant, favourite});

            } catch (err) {
                console.log("Error adding to favourites: ", err);
                res.status(500).send("Server error");
            }


        } else {
            res.status(404).send("Destination not found");
        }

    }

});


//Add Favourite
app.post("/add-favourite/:category/:place", async(req, res) => {
    const place = req.params.place.toLowerCase();
    const category = req.params.category;
    const userId = req.session.userId;
    //console.log("User ID in add favourite: ", userId);
    console.log("Add Favourite Category: ", category);

    if (!userId) {
        return res.status(401).send("You must logged in to add favourite");
    }

    let favourite_destination;

    if (category === "destination") {
        favourite_destination = destinations[place];

    } else if (category === "accomodation") {
        favourite_destination = accomodations[place];

    } else if (category === "transportation") {
        favourite_destination = transportations[place];

    } else if (category === "restaurant") {
        favourite_destination = restaurants[place];

    }

    console.log("Favourite Item: ", favourite_destination);

    if (!favourite_destination) {
        res.status(404).send("Please check your destination database");
    }

    //Need to chnage !!!!!
    
    try {
        const user = await collection.findById(userId);
        const favourite = user && user.favourite ? Object.values(user.favourite) : [];

        function isFavourited(destination, favouriteList) {
            return favouriteList.some(fav => fav.name === destination.name);
        } 

        const isFavourite = isFavourited(favourite_destination, favourite);

        if (!isFavourite) {

            try {
                await collection.findByIdAndUpdate(userId, { $addToSet: {favourite: favourite_destination} });

                console.log(`Added ${place} to your favourites`);
                //res.render("main-page.ejs");

            } catch (err) {
                console.log("Error adding to favourites: ", err);
                res.status(500).send("Server error");
            }

        } else {

            try {
                await collection.findByIdAndUpdate(userId, {
                    $pull: { favourite: { name: favourite_destination.name } }
                });

                console.log(`Remove ${place} from your favourites`);
                //res.render("main-page.ejs");

            } catch (err) {
                console.log("Error adding to favourites: ", err);
                res.status(500).send("Server error");
            }

        }


    } catch (err) {
        console.log("Error retrieving favourites: ", err);
        res.status(500).send("Server error");
    }

});

//Add Planner
app.post("/add-planner/:category/:place", async(req, res) => {
    const userId = req.session.userId;
    console.log("User Id in add planner: ", userId);
    const date = new Date(req.body.date);
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
    const num_of_person = req.body.num_of_person;
    console.log("Date At Planner: ", formattedDate);

    const destinationName = req.params.place.toLowerCase();
    const category = req.params.category;

    if (!userId) {
        return res.status(401).send("You must logged in to add planner");
    }

    if (category === "destination") {
        try {
            const currentUser = await collection.findById(userId);
            const destination = destinations[destinationName];

            if (!destination) {
                return res.status(404).send("Destination not found in user's favourites");
            }

            const existingPlanner = currentUser.planner.find(p => p.date === formattedDate);

            if (existingPlanner) {
                const alreadyExistName = existingPlanner.destination.some(d => d.name === destination.name);

                if (!alreadyExistName) {
                    existingPlanner.destination.push(destination);
                }

            } else {
                currentUser.planner.push({
                    date: formattedDate,
                    destination: [destination]
                });
            }

            await currentUser.save();

            //res.render("main-page.ejs");

        } catch (err) {
            console.error(err);
            res.status(500).send("Error adding planner");
        }

    } else if (category === "accomodation") {
        try {
            const currentUser = await collection.findById(userId);
            const accomodation = accomodations[destinationName];

            if (!accomodation) {
                return res.status(404).send("Destination not found in user's favourites");
            }

            const existingPlanner = currentUser.planner.find(p => p.date === formattedDate);

            if (existingPlanner) {
                const alreadyExistName = existingPlanner.destination.some(d => d.name === accomodation.name);

                if (!alreadyExistName) {
                    existingPlanner.destination.push(accomodation);
                }

            } else {
                currentUser.planner.push({
                    date: formattedDate,
                    destination: [accomodation]
                });
            }

            await currentUser.save();

            //res.render("main-page.ejs");

        } catch (err) {
            console.error(err);
            res.status(500).send("Error adding planner");
        }

    } else if (category === "restaurant") {
        try {
            const currentUser = await collection.findById(userId);
            const restaurant = restaurants[destinationName];

            if (!restaurant) {
                return res.status(404).send("Destination not found in user's favourites");
            }

            const existingPlanner = currentUser.planner.find(p => p.date === formattedDate);

            if (existingPlanner) {
                const alreadyExistName = existingPlanner.destination.some(d => d.name === restaurant.name);

                if (!alreadyExistName) {
                    existingPlanner.destination.push(restaurant);
                }

            } else {
                currentUser.planner.push({
                    date: formattedDate,
                    destination: [restaurant]
                });
            }

            await currentUser.save();

            //res.render("main-page.ejs");

        } catch (err) {
            console.error(err);
            res.status(500).send("Error adding planner");
        }
    }
});


//Get to Search Page
app.get("/search", async (req, res) => {
    const { state, category, price, idea } = req.query;
    let results = [];
    console.log("Result Query: ", req.query);
    console.log("Category: ", category);

    if (category.toLowerCase() === "destination") {
        console.log("Case 1");
        results = Object.values(destinations).filter(destination => {
            // Match only if category is 'destination' (you can skip this if not needed)
            const isDestination = category === 'destination' ? destination.category === 'destination' : true;

            // If state is selected, match it; otherwise allow all
            const matchesState = state && state !== "Where to?" ? destination.short_location === state : true;

            // If price is selected, match it; otherwise allow all
            const matchesPrice = price && price !== "Budget" ? destination.price <= parseInt(price) : true;

            // If idea is selected, match it; otherwise allow all
            const matchesIdea = idea && idea !== "Travel Ideas" ? destination.idea === idea : true;

            return isDestination && matchesState && matchesPrice && matchesIdea;
        });

    } else if (category.toLowerCase() === "accomodation") {
        console.log("Case 2");
        results = Object.values(accomodations).filter(destination => {
            // Match only if category is 'destination' (you can skip this if not needed)
            const isDestination = category === 'accomodation' ? destination.category === 'accomodation' : true;

            // If state is selected, match it; otherwise allow all
            const matchesState = state && state !== "Where to?" ? destination.short_location === state : true;

            // If price is selected, match it; otherwise allow all
            const matchesPrice = price && price !== "Budget" ? destination.price <= parseInt(price) : true;

            // If idea is selected, match it; otherwise allow all
            const matchesIdea = idea && idea !== "Travel Ideas" ? destination.idea === idea : true;

            return isDestination && matchesState && matchesPrice && matchesIdea;
        });

    } else if (category.toLowerCase() === "transportation") {
        console.log("Case 3");
        results = Object.values(transportations).filter(destination => {
            // Match only if category is 'destination' (you can skip this if not needed)
            const isDestination = category === 'transportation' ? destination.category === 'transportation' : true;

            // If state is selected, match it; otherwise allow all
            const matchesState = state && state !== "Where to?" ? destination.short_location === state : true;

            // If price is selected, match it; otherwise allow all
            const matchesPrice = price && price !== "Budget" ? destination.price <= parseInt(price) : true;

            // If idea is selected, match it; otherwise allow all
            const matchesIdea = idea && idea !== "Travel Ideas" ? destination.idea === idea : true;

            return isDestination && matchesState && matchesPrice && matchesIdea;
        });

    } else if (category.toLowerCase() === "restaurant") {
        console.log("Case 4");
        results = Object.values(restaurants).filter(destination => {
            // Match only if category is 'destination' (you can skip this if not needed)
            const isDestination = category === 'restaurant' ? destination.category === 'restaurant' : true;

            // If state is selected, match it; otherwise allow all
            const matchesState = state && state !== "Where to?" ? destination.short_location === state : true;

            // If price is selected, match it; otherwise allow all
            const matchesPrice = price && price !== "Budget" ? destination.price <= parseInt(price) : true;

            // If idea is selected, match it; otherwise allow all
            const matchesIdea = idea && idea !== "Travel Ideas" ? destination.idea === idea : true;

            return isDestination && matchesState && matchesPrice && matchesIdea;
        });

    }

    const userId = req.session.userId;

    try {
        const user = await collection.findById(userId);

        const favourite = user && user.favourite ? Object.values(user.favourite) : [];

        //console.log("Search Result: ", results);
        res.render("search.ejs", { results, filters: req.query, favourite });

    } catch (err) {
        console.error("Error retrieving search result:", err);
        res.status(500).send("Server error");
    }
});

app.post('/offset-now', (req, res) => {
  const { footprintData } = req.body;
  console.log('Received Table Data:', footprintData);

  // Respond with the processed data or redirect
  res.json({ processedData: footprintData });
});

app.get('/carbon-offset', (req, res) => {
  const data = JSON.parse(req.query.data);
  res.render('carbonOffset-pg22', { data });
});

// GET route for forgot password page
app.get("/forgot-password", (req, res) => {
    res.render("forgot-password");
});

// POST route to send OTP
app.post("/send-otp", async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        // Check if user exists in database
        const user = await collection.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found with this email" });
        }

        // Call the OTP API
        const response = await fetch('http://20.255.74.48:8080/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                key: "soda"
            })
        });

        const data = await response.json();
        
        if (response.ok && data.otp) {
            // Store OTP in session for verification
            req.session.resetOTP = data.otp;
            req.session.resetEmail = email;
            req.session.otpTimestamp = Date.now();
            
            console.log(`OTP sent to ${email}: ${data.otp}`);
            res.json({ success: true, message: "OTP sent successfully to your email" });
        } else {
            res.status(500).json({ success: false, message: "Failed to send OTP" });
        }

    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ success: false, message: "Server error occurred" });
    }
});

// POST route to verify OTP and reset password
app.post("/verify-otp", async (req, res) => {
    try {
        const { otp, newPassword } = req.body;
        
        if (!otp || !newPassword) {
            return res.status(400).json({ success: false, message: "OTP and new password are required" });
        }

        // Check if OTP session exists
        if (!req.session.resetOTP || !req.session.resetEmail) {
            return res.status(400).json({ success: false, message: "No OTP session found. Please request a new OTP" });
        }

        // Check OTP expiry (10 minutes)
        const otpAge = Date.now() - req.session.otpTimestamp;
        if (otpAge > 10 * 60 * 1000) {
            req.session.resetOTP = null;
            req.session.resetEmail = null;
            req.session.otpTimestamp = null;
            return res.status(400).json({ success: false, message: "OTP has expired. Please request a new one" });
        }

        // Verify OTP
        if (otp !== req.session.resetOTP) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        // Hash new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update password in database
        await collection.findOneAndUpdate(
            { email: req.session.resetEmail },
            { $set: { password: hashedPassword } }
        );

        // Clear OTP session
        req.session.resetOTP = null;
        req.session.resetEmail = null;
        req.session.otpTimestamp = null;

        console.log(`Password reset successful for ${req.session.resetEmail}`);
        res.json({ success: true, message: "Password reset successfully" });

    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ success: false, message: "Server error occurred" });
    }
});


app.get("/search", (req, res) => {
    res.render("payment-page-pg8.ejs");
});


const port = 5000;
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});
