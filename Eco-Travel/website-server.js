const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./src/config");
const session = require('express-session');
const destinations = require("./src/destination_library");
const accomodations = require("./src/accomodation_library");
const restaurants = require("./src/restaurant_library");
const transportations = require("./src/transportation_library");


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

function getRandomDestinations(obj, count) {
  const all = Object.values(obj);
  const shuffled = all.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
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
        res.send("User already exists. Please choose a different email");

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
            res.send("User name cannot found!");
        }

        //Compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);

        if (isPasswordMatch) {
            console.log("Current User Login: ", check._id);
            req.session.userId = check._id;
            res.render("main-page.ejs", {
                destinations: Object.values(destinations),
                accomodations: Object.values(accomodations),
                restaurants: Object.values(restaurants),
                transportations: Object.values(transportations)
            });

        } else {
            req.send("Password Incorrect!");

        }

    } catch {
        res.send("Wrong Details");

    }
})

//User Profile Settingd
app.get("/profile-settings-pg4", async (req, res) => {
    const userProfileData = await collection.findById(req.session.userId);
    console.log("User Profile Settings: ", userProfileData);
    res.render("profile-settings-pg4.ejs");
})

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

//Delete Account
app.get("/delete-account", (req, res) => {
    res.render("delete-account-pg5.ejs");
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
                res.render("main-page.ejs");

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
                res.render("main-page.ejs");

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

            res.render("main-page.ejs");

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

            res.render("main-page.ejs");

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

            res.render("main-page.ejs");

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


const port = 5000;
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});
