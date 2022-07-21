const mongoose = require ("mongoose")
const FormSchema = new mongoose.Schema({

    firstName: { type: String},

    lastName: { type: String },

    city:{ type: String },

    gender:{ type: String },

    DOB:{ day: { type: String }, month: { type: String }, year: { type: String }},

    maritalStatus: { type: String },

    education: { type: String },

    occupation: { type: String },

    knowCBC: { type: String },

    //section B

    salvationExperience: { type: String },

    priorDenomination: { type: String },

    pastorName: { type: String },

    pastorChurch: { type: String },

    pastorTown: { type: String },

    currentLocalChurch: { type: String },

    currentLocalPastor: { type: String },

    currentChurchLocation: { type: String },

    churchRole: { type: String },

    churchRoleDuration: { type: Number },

    commitmentPlan: { type: String },

    affiliationName: { type: String },

    affiliationPastor: { type: String },

    affiliationPurpose: { type: String },

    affiliationLocation: { type: String },

    affiliationCommitmentPlan: { type: String },

    affiliationCommitmentLevel: { type: String },

    scholarshipMinistry: { type: String },

    scholarship:{ date: { type: String }, duration: { type: Number }, specialization: { type: String }, certification: { type: String }},

    //Section C
    
    speakTongue: { type: String },
    
    concepts:{ 
      hermeneutics: { type: String }, salvation: { type: String }, gift: { type: String }, 
      church: { type: String }, discipleship: { type: String }
    },

    understanding: { type: String },

    expectation: { type: String },

    objectives: { type: String },

    //section D

    TOC: { type: Boolean},

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
},

{ timestamps: true}
);

module.exports = mongoose.model("Form", FormSchema )