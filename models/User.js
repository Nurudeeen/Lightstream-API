const mongoose = require ("mongoose")
const UserSchema = new mongoose.Schema({

    firstName: { type: String},

    lastName: { type: String },

    phone:{ type: String },

    email: {
        type: String
    },

    password:{ type: String, },

   
    isAdmin:{
        type: Boolean,
        default: false,

    },
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
    },
    status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Pending'
      },

    confirmationCode: { type: String, unique: true },
    
},

{ timestamps: true}
);

module.exports = mongoose.model("User", UserSchema )