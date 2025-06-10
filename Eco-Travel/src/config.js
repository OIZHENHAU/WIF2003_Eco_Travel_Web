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

//Enhanced schema with comprehensive OAuth support
const LoginRegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    first_name: {
        type: String,
        required: false,
        default: "NIL"
    },

    last_name: {
        type: String,
        required: false,
        default: "NIL"
    },

    mobile: {
        type: String,
        required: false,
        default: "NIL"
    },

    gender: {
        type: String,
        required: false,
        default: "NIL"
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    address: {
        type: String,
        required: false,
        default: "NIL"
    },

    // Password is optional for OAuth users
    password: {
        type: String,
        required: function() {
            return !this.auth0Id && !this.provider || this.provider === 'local';
        }
    },

    // OAuth-specific fields
    auth0Id: {
        type: String,
        unique: true,
        sparse: true
    },

    provider: {
        type: String,
        enum: ['local', 'auth0', 'google', 'facebook', 'linkedin', 'github', 'apple'],
        default: 'local'
    },

    // Enhanced profile picture handling
    profilePicture: {
        type: String,
        required: false
    },

    profilePictureSource: {
        type: String,
        enum: ['upload', 'oauth', 'default'],
        default: 'default'
    },

    // Social provider specific IDs
    socialIds: {
        googleId: String,
        facebookId: String,
        linkedinId: String,
        githubId: String,
        appleId: String
    },

    // Comprehensive OAuth data storage
    oauthData: {
        // Auth0 specific data
        sub: String,
        nickname: String,
        locale: String,
        email_verified: Boolean,
        updated_at: Date,
        
        // Generic OAuth data
        raw_profile: mongoose.Schema.Types.Mixed,
        access_token_info: {
            scope: [String],
            expires_at: Date
        },
        
        // Provider specific metadata
        provider_metadata: mongoose.Schema.Types.Mixed
    },

    // Account verification and status
    isVerified: {
        type: Boolean,
        default: function() {
            return this.provider !== 'local';
        }
    },

    emailVerified: {
        type: Boolean,
        default: function() {
            return this.provider !== 'local';
        }
    },

    // Login/logout tracking
    lastLogin: {
        type: Date,
        default: Date.now
    },

    lastLogout: {
        type: Date
    },

    lastOAuthSync: {
        type: Date,
        default: Date.now
    },

    // Privacy and sync settings
    oauthPrivacy: {
        syncProfile: { type: Boolean, default: true },
        syncPicture: { type: Boolean, default: true },
        syncBasicInfo: { type: Boolean, default: true },
        allowDataRefresh: { type: Boolean, default: true }
    },

    // Account preferences
    preferences: {
        language: { type: String, default: 'en' },
        timezone: String,
        notifications: {
            email: { type: Boolean, default: true },
            push: { type: Boolean, default: true }
        }
    },

    // Security settings
    security: {
        twoFactorEnabled: { type: Boolean, default: false },
        loginAttempts: { type: Number, default: 0 },
        lockoutUntil: Date,
        passwordResetToken: String,
        passwordResetExpires: Date
    },

    favourite: [destinationSchema],
    planner: [plannerSchema]
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Indexes for better performance
LoginRegisterSchema.index({ email: 1 });
LoginRegisterSchema.index({ auth0Id: 1 });
LoginRegisterSchema.index({ provider: 1 });
LoginRegisterSchema.index({ 'socialIds.googleId': 1 });
LoginRegisterSchema.index({ 'socialIds.facebookId': 1 });

// Pre-save middleware
LoginRegisterSchema.pre('save', function(next) {
    // Set default provider
    if (!this.provider && !this.auth0Id) {
        this.provider = 'local';
    }
    if (this.auth0Id && !this.provider) {
        this.provider = 'auth0';
    }
    
    // Update OAuth sync timestamp
    if (this.isModified('oauthData')) {
        this.lastOAuthSync = new Date();
    }
    
    // Set email verification status
    if (this.oauthData && this.oauthData.email_verified !== undefined) {
        this.emailVerified = this.oauthData.email_verified;
    }
    
    next();
});

// Virtual properties
LoginRegisterSchema.virtual('isOAuthUser').get(function() {
    return this.provider !== 'local' || !!this.auth0Id;
});

LoginRegisterSchema.virtual('fullName').get(function() {
    if (this.first_name !== 'NIL' && this.last_name !== 'NIL') {
        return `${this.first_name} ${this.last_name}`.trim();
    }
    return this.name;
});

LoginRegisterSchema.virtual('isAccountLocked').get(function() {
    return !!(this.security.lockoutUntil && this.security.lockoutUntil > Date.now());
});

// Instance methods
LoginRegisterSchema.methods.canResetPassword = function() {
    return this.provider === 'local' && !this.auth0Id;
};

LoginRegisterSchema.methods.needsOAuthRefresh = function() {
    if (!this.isOAuthUser) return false;
    
    const lastSync = new Date(this.lastOAuthSync);
    const now = new Date();
    const hoursSinceSync = (now - lastSync) / (1000 * 60 * 60);
    
    return hoursSinceSync > 24; // Refresh every 24 hours
};

LoginRegisterSchema.methods.updateFromOAuthProfile = function(profileData) {
    // Update basic info if sync is enabled
    if (this.oauthPrivacy.syncBasicInfo) {
        if (profileData.first_name && profileData.first_name !== 'NIL') {
            this.first_name = profileData.first_name;
        }
        if (profileData.last_name && profileData.last_name !== 'NIL') {
            this.last_name = profileData.last_name;
        }
        if (profileData.name) {
            this.name = profileData.name;
        }
    }
    
    // Update profile picture if sync is enabled
    if (this.oauthPrivacy.syncPicture && profileData.profilePicture) {
        this.profilePicture = profileData.profilePicture;
        this.profilePictureSource = 'oauth';
    }
    
    // Update OAuth data
    this.oauthData = { ...this.oauthData, ...profileData.auth0_raw };
    this.lastOAuthSync = new Date();
    this.lastLogin = new Date();
    
    return this;
};

// Static methods
LoginRegisterSchema.statics.findOrCreateOAuthUser = async function(profileData, provider = 'auth0') {
    try {
        console.log('Creating/finding OAuth user with data:', JSON.stringify(profileData, null, 2));
        
        // First, try to find user by auth0Id or email
        let user = await this.findOne({
            $or: [
                { auth0Id: profileData.auth0Id },
                { email: profileData.email }
            ]
        });

        if (user) {
            console.log('Found existing user:', user._id);
            
            // Update existing user with latest OAuth info
            user.updateFromOAuthProfile(profileData);
            await user.save();
            
            console.log('Updated existing user with OAuth data');
            return user;
        } else {
            console.log('Creating new OAuth user');
            
            // Create new OAuth user with comprehensive data
            const newUser = new this({
                auth0Id: profileData.auth0Id,
                name: profileData.name,
                email: profileData.email,
                first_name: profileData.first_name || 'NIL',
                last_name: profileData.last_name || 'NIL',
                gender: profileData.gender || 'NIL',
                profilePicture: profileData.profilePicture,
                profilePictureSource: profileData.profilePicture ? 'oauth' : 'default',
                provider: provider,
                isVerified: true,
                emailVerified: profileData.auth0_raw?.email_verified || true,
                favourite: [],
                planner: [],
                oauthData: profileData.auth0_raw || {},
                lastOAuthSync: new Date(),
                oauthPrivacy: {
                    syncProfile: true,
                    syncPicture: true,
                    syncBasicInfo: true,
                    allowDataRefresh: true
                }
            });

            const savedUser = await newUser.save();
            console.log('Created new OAuth user:', savedUser._id);
            return savedUser;
        }
    } catch (error) {
        console.error('Error in findOrCreateOAuthUser:', error);
        throw new Error(`Error in findOrCreateOAuthUser: ${error.message}`);
    }
};

LoginRegisterSchema.statics.findByOAuthId = async function(oauthId, provider) {
    const query = {};
    
    if (provider === 'auth0') {
        query.auth0Id = oauthId;
    } else if (provider === 'google') {
        query['socialIds.googleId'] = oauthId;
    } else if (provider === 'facebook') {
        query['socialIds.facebookId'] = oauthId;
    }
    
    return await this.findOne(query);
};

//Collection Part
const collection = mongoose.model("User", LoginRegisterSchema);

module.exports = collection;