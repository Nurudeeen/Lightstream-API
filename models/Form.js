const mongoose = require ("mongoose")
const FormSchema = new mongoose.Schema({

    firstName: { type: String},

    lastName: { type: String },

    email: { type: String },


    city:{ type: String },

    gender:{ type: String },

    DOB:{ type: Date },

    maritalStatus: { type: String },

    educationLevel: { type: String },

    otherEducationLevel: { type: String },

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

    affiliationName1: { type: String },

    affiliationPastor1: { type: String },

    affiliationPurpose1: { type: String },

    otherAffiliationPurpose1: {type: String},

    affiliationLocation1: { type: String },

    affiliationCommitmentPlan1: { type: String },

    affiliationCommitmentLevel: { type: String },

    affiliationName2: { type: String },

    affiliationPastor2: { type: String },

    affiliationPurpose2: { type: String },

    otherAffiliationPurpose2: {type: String},

    affiliationLocation2: { type: String },

    affiliationCommitmentPlan2: { type: String },

    affiliationCommitmentLevel2: { type: String },

    scholarshipMinistry2: { type: String },

    scholarship:{ date: { type: Date }, duration: { type: Number }, specialization: { type: String }, certification: { type: String } },

    //Section C
    
    speakTongue: { type: String },
    
    concepts:{ 
      hermeneutics: { type: String }, salvation: { type: String }, gift: { type: String }, 
      church: { type: String }, discipleship: { type: String }
    },

    understanding: { type: String },

    thinkMinistry: { type: String },

    planMinistry: { type:String },

    expectation: { type: String },

    objectives: { type: String },

    //section D

    TOC: { type: Boolean},

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
},

{ timestamps: true}
);

module.exports = mongoose.model("Form", FormSchema )