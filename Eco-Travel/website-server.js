const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./src/config");
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const destinations = require("./src/destination_library");
const accomodations = require("./src/accomodation_library");
const restaurants = require("./src/restaurant_library");
const transportations = require("./src/transportation_library");

const app = express();

// Auth0 Configuration
const auth0Config = {
    domain: process.env.AUTH0_DOMAIN || 'dev-uy8ebdyummri3ump.us.auth0.com',
    clientID: process.env.AUTH0_CLIENT_ID || '6cPkWLuuogE6AxjdxWPG2qjeeZNL4hiN',
    clientSecret: process.env.AUTH0_CLIENT_SECRET || 'ZF9212T-bWrwQ1EnHYVIIqc_YGIPJ9NtcazmyOdWfvmPpd5xM-Qg2MoAjAmLINq_',
    callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:5000/callback'
};

//Convert data into json format
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "img-src 'self' data: https: http:;");
    next();
});

app.use(session({
    secret: process.env.SESSION_SECRET || 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true,
        sameSite: 'lax'
    },
    name: 'connect.sid' // Explicit session name
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Auth0 Strategy
passport.use(new Auth0Strategy({
    domain: auth0Config.domain,
    clientID: auth0Config.clientID,
    clientSecret: auth0Config.clientSecret,
    callbackURL: auth0Config.callbackURL
}, async (accessToken, refreshToken, extraParams, profile, done) => {
    try {
        console.log('Auth0 Profile Data:', JSON.stringify(profile, null, 2));
        console.log('Auth0 Profile._json:', JSON.stringify(profile._json, null, 2));
        
        // Safely extract email with multiple fallbacks
        let email = null;
        if (profile.emails && Array.isArray(profile.emails) && profile.emails.length > 0) {
            email = profile.emails[0].value;
        } else if (profile._json && profile._json.email) {
            email = profile._json.email;
        } else if (profile.email) {
            email = profile.email;
        }
        
        // Validate that we have an email
        if (!email) {
            console.error('No email found in profile data');
            return done(new Error('Email is required but not provided by Auth0'), null);
        }
        
        // Safely extract profile picture with multiple fallbacks
        let profilePicture = null;
        if (profile.picture) {
            profilePicture = profile.picture;
        } else if (profile._json && profile._json.picture) {
            profilePicture = profile._json.picture;
        } else if (profile.photos && Array.isArray(profile.photos) && profile.photos.length > 0) {
            profilePicture = profile.photos[0].value;
        }
        
        // Safely extract name information
        const displayName = profile.displayName || profile._json?.name || profile.nickname || profile._json?.nickname || 'User';
        const firstName = profile._json?.given_name || (profile.name && profile.name.givenName) || 'NIL';
        const lastName = profile._json?.family_name || (profile.name && profile.name.familyName) || 'NIL';
        
        // Extract comprehensive profile information with safe access
        const profileData = {
            auth0Id: profile.id,
            name: displayName,
            email: email,
            profilePicture: profilePicture,
            provider: 'auth0',
            
            // Extract additional profile information safely
            first_name: firstName,
            last_name: lastName,
            gender: profile._json?.gender || 'NIL',
            
            // Auth0 specific fields with safe access
            auth0_raw: {
                sub: profile._json?.sub || profile.id,
                nickname: profile._json?.nickname || profile.nickname,
                locale: profile._json?.locale || 'en',
                updated_at: profile._json?.updated_at,
                email_verified: profile._json?.email_verified || false
            }
        };

        console.log('Processed Profile Data:', JSON.stringify(profileData, null, 2));

        // Use the enhanced findOrCreateOAuthUser function
        const user = await findOrCreateOAuthUser(profileData, 'auth0');
        return done(null, user);
    } catch (error) {
        console.error('Auth0 Strategy Error:', error);
        console.error('Error stack:', error.stack);
        return done(error, null);
    }
}));


async function findOrCreateOAuthUser(profileData, provider = 'auth0') {
    try {
        console.log('Creating/finding OAuth user with data:', JSON.stringify(profileData, null, 2));
        
        // First, try to find user by auth0Id or email
        let user = await collection.findOne({
            $or: [
                { auth0Id: profileData.auth0Id },
                { email: profileData.email }
            ]
        });

        if (user) {
            console.log('Found existing user:', user._id);
            
            // Update existing user with latest OAuth info
            const updateData = {
                auth0Id: profileData.auth0Id,
                provider: provider,
                profilePicture: profileData.profilePicture || user.profilePicture,
                lastLogin: new Date(),
                isVerified: true
            };

            // Update name fields if they're more complete from OAuth
            if (profileData.first_name && profileData.first_name !== 'NIL') {
                updateData.first_name = profileData.first_name;
            }
            if (profileData.last_name && profileData.last_name !== 'NIL') {
                updateData.last_name = profileData.last_name;
            }
            if (profileData.gender && profileData.gender !== 'NIL') {
                updateData.gender = profileData.gender;
            }

            // Store raw OAuth data for reference
            if (profileData.auth0_raw) {
                updateData.oauthData = profileData.auth0_raw;
            }

            const updatedUser = await collection.findByIdAndUpdate(
                user._id,
                { $set: updateData },
                { new: true }
            );
            
            console.log('Updated existing user with OAuth data');
            return updatedUser;
        } else {
            console.log('Creating new OAuth user');
            
            // Create new OAuth user with comprehensive data
            const newUserData = {
                auth0Id: profileData.auth0Id,
                name: profileData.name,
                email: profileData.email,
                first_name: profileData.first_name || 'NIL',
                last_name: profileData.last_name || 'NIL',
                gender: profileData.gender || 'NIL',
                mobile: 'NIL',
                address: 'NIL',
                profilePicture: profileData.profilePicture,
                provider: provider,
                isVerified: true,
                favourite: [],
                planner: []
            };

            const createdUsers = await collection.insertMany([newUserData]);
            const savedUser = createdUsers[0];
            console.log('Created new OAuth user:', savedUser._id);
            return savedUser;
        }
    } catch (error) {
        console.error('Error in findOrCreateOAuthUser:', error);
        throw new Error(`Error in findOrCreateOAuthUser: ${error.message}`);
    }
}

// Passport serialization
passport.serializeUser((user, done) => {
    done(null, user._id);
});



passport.deserializeUser(async (id, done) => {
    try {
        const user = await collection.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

app.use(express.static("public"));
app.use(express.static("src"));
app.use(express.static("img"));
app.use(express.static("views"));

//use EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




// Middleware to check authentication
const requireAuth = (req, res, next) => {
    if (req.isAuthenticated() || req.session.userId) {
        return next();
    }
    res.redirect('/');
};

app.get("/", (req, res) => {
    res.render("index.ejs");
    console.log("Welcome to Home Page");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// OAuth Routes
app.get('/auth', passport.authenticate('auth0', {
    scope: 'openid email profile'
}));

app.get('/callback', 
    passport.authenticate('auth0', { failureRedirect: '/' }),
    async (req, res) => {
        try {
            // Set session userId for compatibility with existing code
            req.session.userId = req.user._id;
            
            console.log('OAuth callback successful for user:', req.user._id);
            
            res.render("main-page.ejs", {
                destinations: Object.values(destinations),
                accomodations: Object.values(accomodations),
                restaurants: Object.values(restaurants),
                transportations: Object.values(transportations),
                user: req.user
            });
        } catch (error) {
            console.error('Callback error:', error);
            res.redirect('/?error=callback_failed');
        }
    }
);

app.get('/api/proxy-image/:userId', requireAuth, async (req, res) => {
    try {
        const userId = req.params.userId;
        const requestingUserId = req.session.userId || (req.user && req.user._id);
        
        // Security check - users can only access their own profile image
        if (userId !== requestingUserId.toString()) {
            return res.status(403).send('Forbidden');
        }

        const user = await collection.findById(userId);
        if (!user || !user.profilePicture) {
            return res.redirect('/img/default-avatar.png'); // fallback to default image
        }

        const imageUrl = user.profilePicture;
        
        // If it's already a local image, redirect to it
        if (imageUrl.startsWith('/') || imageUrl.startsWith('http://localhost') || imageUrl.startsWith('https://via.placeholder.com')) {
            return res.redirect(imageUrl);
        }

        // For external URLs (OAuth providers), proxy the image
        const fetch = require('node-fetch'); // You might need to install this: npm install node-fetch@2
        
        const imageResponse = await fetch(imageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'image/*,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1'
            },
            timeout: 10000 // 10 second timeout
        });

        if (!imageResponse.ok) {
            console.log(`Failed to fetch profile image: ${imageResponse.status}`);
            return res.redirect('/img/default-avatar.png');
        }

        const contentType = imageResponse.headers.get('content-type');
        
        // Validate that it's actually an image
        if (!contentType || !contentType.startsWith('image/')) {
            console.log(`Invalid content type: ${contentType}`);
            return res.redirect('/img/default-avatar.png');
        }

        // Set appropriate headers
        res.set({
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
            'Access-Control-Allow-Origin': '*',
            'Cross-Origin-Resource-Policy': 'cross-origin'
        });

        // Stream the image data
        imageResponse.body.pipe(res);

    } catch (error) {
        console.error('Error proxying image:', error);
        res.redirect('/img/default-avatar.png');
    }
});

app.get("/debug-oauth", requireAuth, async (req, res) => {
    if (process.env.NODE_ENV !== 'production') {
        const userId = req.session.userId || (req.user && req.user._id);
        const user = await collection.findById(userId);
        res.json({
            user: user,
            session: {
                userId: req.session.userId,
                isAuthenticated: req.isAuthenticated(),
                user: req.user
            }
        });
    } else {
        res.status(404).send('Not found');
    }
});


// Enhanced logout
app.get("/logout-account", async (req, res) => {
    try {
        let isOAuthUser = false;
        let logoutURL = '/';
        
        // Check if user is authenticated and get user info
        if (req.isAuthenticated() && req.user) {
            isOAuthUser = req.user.provider !== 'local' || req.user.auth0Id;
        } else if (req.session && req.session.userId) {
            try {
                const user = await collection.findById(req.session.userId);
                if (user) {
                    isOAuthUser = user.provider !== 'local' || user.auth0Id;
                }
            } catch (userError) {
                console.error('Error finding user for logout:', userError);
            }
        }
        
        // Prepare Auth0 logout URL with prompt=login to force re-authentication
        if (isOAuthUser) {
            const returnTo = encodeURIComponent(process.env.BASE_URL || 'http://localhost:5000/');
            logoutURL = `https://dev-uy8ebdyummri3ump.us.auth0.com/v2/logout?returnTo=${returnTo}&client_id=${auth0Config.clientID}&prompt=login`;
        }
        
        // Clear session and cookies
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Session destruction error:', err);
                }
                
                res.clearCookie('connect.sid', { path: '/' });
                
                if (req.isAuthenticated && req.isAuthenticated()) {
                    req.logout((err) => {
                        if (err) {
                            console.error('Passport logout error:', err);
                        }
                        
                        if (isOAuthUser) {
                            res.redirect(logoutURL);
                        } else {
                            res.redirect('/?logout=success');
                        }
                    });
                } else {
                    if (isOAuthUser) {
                        res.redirect(logoutURL);
                    } else {
                        res.redirect('/?logout=success');
                    }
                }
            });
        } else {
            res.clearCookie('connect.sid', { path: '/' });
            
            if (req.isAuthenticated && req.isAuthenticated()) {
                req.logout((err) => {
                    if (err) {
                        console.error('Passport logout error:', err);
                    }
                    
                    if (isOAuthUser) {
                        res.redirect(logoutURL);
                    } else {
                        res.redirect('/?logout=success');
                    }
                });
            } else {
                if (isOAuthUser) {
                    res.redirect(logoutURL);
                } else {
                    res.redirect('/?logout=success');
                }
            }
        }
        
    } catch (error) {
        console.error('Logout error:', error);
        res.redirect('/?logout=error');
    }
});

app.get('/auth', passport.authenticate('auth0', {
    scope: 'openid email profile',
    prompt: 'login'
}));

app.get("/logout-account-simple", async (req, res) => {
    try {
        let isOAuthUser = false;
        
        // Check user type
        if (req.user) {
            isOAuthUser = req.user.provider !== 'local' || req.user.auth0Id;
        } else if (req.session && req.session.userId) {
            const user = await collection.findById(req.session.userId);
            if (user) {
                isOAuthUser = user.provider !== 'local' || user.auth0Id;
            }
        }
        
        // Simple session destroy
        if (req.session) {
            req.session.destroy();
        }
        
        // Simple cookie clear
        res.clearCookie('connect.sid');
        
        // Redirect based on user type
        if (isOAuthUser) {
            const returnTo = encodeURIComponent('http://localhost:5000/');
            const logoutURL = `https://${auth0Config.domain}/v2/logout?returnTo=${returnTo}&client_id=${auth0Config.clientID}`;
            res.redirect(logoutURL);
        } else {
            res.redirect('/?logout=success');
        }
        
    } catch (error) {
        console.error('Simple logout error:', error);
        res.redirect('/');
    }
});

//Register User (Traditional)
app.post("/signup", async(req, res) => {
    console.log("POST /signup route hit");

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
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);

            data.password = hashedPassword;
            data.favourite = [];
            data.planner = [];

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

// Login User (Traditional)
app.post("/login", async(req, res) => {
    try {
        const check = await collection.findOne({name: req.body.username});

        if (!check) {
            return res.send("User name cannot found!");
        }

        //Compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);

        if (isPasswordMatch) {
            console.log("Current User Login: ", check._id);
            req.session.userId = check._id;
            return res.render("main-page.ejs", {
                destinations: Object.values(destinations),
                accomodations: Object.values(accomodations),
                restaurants: Object.values(restaurants),
                transportations: Object.values(transportations)
            });

        } else {
            return res.send("Password Incorrect!");
        }

    } catch (error) {
        console.error("Login error:", error);
        return res.send("Wrong Details");
    }
});

//User Profile Settings
app.get("/profile-settings-pg4", requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId || (req.user && req.user._id);
        const userProfileData = await collection.findById(userId);
        
        console.log("User Profile Settings: ", userProfileData);
        console.log("Profile Picture URL: ", userProfileData.profilePicture); // Debug log

        if (!userProfileData) {
            return res.status(404).send("User Not Found!");
        }
        
        // Add OAuth-specific information and format data properly
        const enhancedUserData = {
            ...userProfileData.toObject(),
            
            // Fix the profile picture - ensure it's always available
            profilePicture: userProfileData.profilePicture || 'https://via.placeholder.com/150',
            
            isOAuthUser: userProfileData.provider !== 'local' || !!userProfileData.auth0Id,
            canResetPassword: userProfileData.provider === 'local' && !userProfileData.auth0Id,
            accountType: userProfileData.provider === 'local' ? 'Traditional' : 'OAuth',
            lastLogin: userProfileData.lastLogin || new Date(),
            
            // Format OAuth provider name properly
            providerDisplayName: userProfileData.provider === 'auth0' ? 'Auth0' : 
                               userProfileData.provider ? userProfileData.provider.charAt(0).toUpperCase() + userProfileData.provider.slice(1) : 
                               'Local',
            
            // Additional OAuth metadata
            isVerified: userProfileData.isVerified || (userProfileData.provider !== 'local')
        };
        
        console.log("Enhanced User Data Profile Picture: ", enhancedUserData.profilePicture); // Debug log
        
        res.render("profile-settings-pg4.ejs", { user: enhancedUserData });

    } catch (err) {
        console.error("Error loading user profile:", err);
        res.status(500).send("Server error");
    }
});


//User Update Profile
app.post("/api/update-profile", requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId || (req.user && req.user._id);
        console.log("Updating profile for user ID:", userId);

        const existingUser = await collection.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const updatedData = {
            first_name: req.body.firstName?.trim() || existingUser.first_name,
            last_name: req.body.lastName?.trim() || existingUser.last_name,
            mobile: req.body.mobile?.trim() || existingUser.mobile,
            gender: req.body.gender?.trim() || existingUser.gender,
            address: req.body.address?.trim() || existingUser.address,
        };

        // Only allow email update for non-OAuth users
        if (existingUser.provider === 'local' && !existingUser.auth0Id) {
            updatedData.email = req.body.email?.trim() || existingUser.email;
        }

        console.log("Updated Data: ", updatedData);

        // Only update password if a new one is entered and user can reset password
        if (req.body.password && req.body.password.trim() !== "" && 
            existingUser.provider === 'local' && !existingUser.auth0Id) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            updatedData.password = hashedPassword;
        }

        const updatedUser = await collection.findByIdAndUpdate(
            userId,
            { $set: updatedData },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        console.log("Profile updated successfully:", updatedUser);

        // Update session user data if needed
        if (req.user) {
            req.user = updatedUser;
        }

        // Return success response for AJAX
        res.json({ 
            success: true, 
            message: "Profile updated successfully",
            user: {
                name: updatedUser.name,
                email: updatedUser.email,
                first_name: updatedUser.first_name,
                last_name: updatedUser.last_name
            }
        });

    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.post("/api/refresh-oauth-profile", requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId || (req.user && req.user._id);
        const user = await collection.findById(userId);
        
        if (!user || user.provider === 'local') {
            return res.status(400).json({ success: false, message: "Not an OAuth user" });
        }

        // For Auth0 users, we could make an API call to get fresh profile data
        // This would require the Management API token
        
        res.json({ 
            success: true, 
            message: "Profile data refreshed",
            lastRefresh: new Date().toISOString()
        });

    } catch (err) {
        console.error("Error refreshing OAuth profile:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Add middleware to automatically sync OAuth profile on login
app.use('/main-page', requireAuth, async (req, res, next) => {
    try {
        // If user is OAuth and last login was more than 24 hours ago, refresh some data
        if (req.user && req.user.provider !== 'local') {
            const lastLogin = new Date(req.user.lastLogin);
            const now = new Date();
            const hoursSinceLogin = (now - lastLogin) / (1000 * 60 * 60);
            
            if (hoursSinceLogin > 24) {
                // Update last login time
                await collection.findByIdAndUpdate(req.user._id, {
                    lastLogin: now
                });
            }
        }
        next();
    } catch (err) {
        console.error("Error in OAuth sync middleware:", err);
        next();
    }
});

//Main Home Page
app.get("/main-page", requireAuth, (req, res) => {
    res.render("main-page.ejs", {
        destinations: Object.values(destinations),
        accomodations: Object.values(accomodations),
        restaurants: Object.values(restaurants),
        transportations: Object.values(transportations)
    });
});

//User Favourite List
app.get("/favourite-pg16", requireAuth, async (req, res) => {
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
app.get("/history-pg17", requireAuth, async (req, res) => {
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

app.post('/log-selected-date', requireAuth, async (req, res) => {
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
            favourite: favourite 
        });

    } catch (err) {
        console.error("Error retrieving planner result:", err);
        res.status(500).send("Server error");
    }
});

//Getting Weather Information
app.get("/weather-pg23", requireAuth, (req, res) => {
    res.render("weather-pg23.ejs");
});

//Carbon Calculator
app.get("/carbon_calculator", requireAuth, (req, res) => {
    res.render("carbon_calculator.ejs");
});

//Redirect to Delete Account Page
app.get("/delete-account", requireAuth, (req, res) => {
    res.render("delete-account-pg5.ejs");
});

//Delete Account
app.post('/delete-my-account', requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        await collection.findByIdAndDelete(userId);
        req.session.destroy();
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

//Get Popular Tourist
app.get("/get-info/:category/:place", requireAuth, async (req, res) => {
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
app.post("/add-favourite/:category/:place", requireAuth, async(req, res) => {
    const place = req.params.place.toLowerCase();
    const category = req.params.category;
    const userId = req.session.userId;
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
app.post("/add-planner/:category/:place", requireAuth, async(req, res) => {
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
app.get("/search", requireAuth, async (req, res) => {
    const { state, category, price, idea } = req.query;
    let results = [];
    console.log("Result Query: ", req.query);
    console.log("Category: ", category);

    if (category.toLowerCase() === "destination") {
        console.log("Case 1");
        results = Object.values(destinations).filter(destination => {
            const isDestination = category === 'destination' ? destination.category === 'destination' : true;
            const matchesState = state && state !== "Where to?" ? destination.short_location === state : true;
            const matchesPrice = price && price !== "Budget" ? destination.price <= parseInt(price) : true;
            const matchesIdea = idea && idea !== "Travel Ideas" ? destination.idea === idea : true;

            return isDestination && matchesState && matchesPrice && matchesIdea;
        });

    } else if (category.toLowerCase() === "accomodation") {
        console.log("Case 2");
        results = Object.values(accomodations).filter(destination => {
            const isDestination = category === 'accomodation' ? destination.category === 'accomodation' : true;
            const matchesState = state && state !== "Where to?" ? destination.short_location === state : true;
            const matchesPrice = price && price !== "Budget" ? destination.price <= parseInt(price) : true;
            const matchesIdea = idea && idea !== "Travel Ideas" ? destination.idea === idea : true;

            return isDestination && matchesState && matchesPrice && matchesIdea;
        });

    } else if (category.toLowerCase() === "transportation") {
        console.log("Case 3");
        results = Object.values(transportations).filter(destination => {
            const isDestination = category === 'transportation' ? destination.category === 'transportation' : true;
            const matchesState = state && state !== "Where to?" ? destination.short_location === state : true;
            const matchesPrice = price && price !== "Budget" ? destination.price <= parseInt(price) : true;
            const matchesIdea = idea && idea !== "Travel Ideas" ? destination.idea === idea : true;

            return isDestination && matchesState && matchesPrice && matchesIdea;
        });

    } else if (category.toLowerCase() === "restaurant") {
        console.log("Case 4");
        results = Object.values(restaurants).filter(destination => {
            const isDestination = category === 'restaurant' ? destination.category === 'restaurant' : true;
            const matchesState = state && state !== "Where to?" ? destination.short_location === state : true;
            const matchesPrice = price && price !== "Budget" ? destination.price <= parseInt(price) : true;
            const matchesIdea = idea && idea !== "Travel Ideas" ? destination.idea === idea : true;

            return isDestination && matchesState && matchesPrice && matchesIdea;
        });
    }

    const userId = req.session.userId;

    try {
        const user = await collection.findById(userId);
        const favourite = user && user.favourite ? Object.values(user.favourite) : [];

        res.render("search.ejs", { results, filters: req.query, favourite });

    } catch (err) {
        console.error("Error retrieving search result:", err);
        res.status(500).send("Server error");
    }
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

        // Don't allow password reset for OAuth users
        if (user.auth0Id || !user.canResetPassword()) {
            return res.status(400).json({ 
                success: false, 
                message: "This account uses social login. Please use the 'Single Sign-On' option." 
            });
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

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});