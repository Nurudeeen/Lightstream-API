const mongoose = require ("mongoose")
const PrayerSchema = new mongoose.Schema({

    name: { type: String},

    email: { type: String },

    country:{ type: String, },

    phone:{ type: String },

    time:{ type: String },
    
},

{ timestamps: true}
);

module.exports = mongoose.model("Prayer", PrayerSchema )