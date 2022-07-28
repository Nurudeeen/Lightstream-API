const mongoose = require ("mongoose")
const UserSchema = new mongoose.Schema({

    firstName: { type: String},

    lastName: { type: String },

    phone:{ type: String },

    email: {
        type: String
    },

    password:{ type: String, },

   
    form: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
    },

    
},

{ timestamps: true}
);

module.exports = mongoose.model("lightstreamUser", UserSchema )