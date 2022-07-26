const router = require("express").Router()

const Form = require("../models/Form")
const User = require("../models/User")
const upload = require("../config/multer");

const {verifyToken,  verifyTokenAndAdmin}= require("./verifyToken")

//CREATE

router.post("/new/form",  upload.none(), async (req,res) => {
   //const userId = req.user.id
   //const user= await User.findById(userId);
   
   //if(!user) return res.status(404).json({message: "User does not exist"})
   
   const formData = {
           //userId:user._id,
           firstName:req.body.firstName,
           lastName:req.body.lastName,
           gender:req.body.gender,
           city:req.body.city,
           DOB:req.body.DOB,
           maritalStatus:req.body.maritalStatus,
           educationLevel:req.body.educationLevel,
           otherEducationLevel:req.body.otherEducationLevel,
           occupation: req.body.occupation,
           knowCBC: req.body.knowCBC,
           //Section B
           salvationExperience:req.body.salvationExperience,
           priorDenomination:req.body.priorDenomination,
           pastorName: req.body.pastorName,
           pastorChurch:req.body.pastorChurch,
           pastorTown:req.body.pastorTown,
           currentLocalChurch:req.body.currentLocalChurch,
           currentLocalPastor:req.body.currentLocalPastor,
           curentChurchLocation:req.body.curentChurchLocation,
           churchRole:req.body.churchRole,
           churchRoleDuration:req.body.churchRoleDuration,
           commitmentPlan:req.body.commitmentPlan,
           affiliationName1:req.body.affiliationName,
           affiliationPastor1:req.body.affiliationPastor,
           affiliationPurpose1:req.body.affiliationPurpose,
           affiliationLocation1:req.body.affiliationLocation,
           affiliationCommitmentPlan1:req.body.affiliationCommitmentPlan,
           affiliationCommitmentLevel1:req.body.affiliationCommitmentLevel,
           otherAffiliationPurpose1:req.body.otherAffiliationPurpose1,
           otherAffiliationPurpose2:req.body.otherAffiliationPurpose2,
           affiliationName2:req.body.affiliationName,
           affiliationPastor2:req.body.affiliationPastor,
           affiliationPurpose2:req.body.affiliationPurpose,
           affiliationLocation2:req.body.affiliationLocation,
           affiliationCommitmentPlan2:req.body.affiliationCommitmentPlan,
           affiliationCommitmentLevel2:req.body.affiliationCommitmentLeve2,
           scholarshipMinistry:req.body.scholarshipMinistry,
           scholarship:{
                    date:req.body.date,
                    duration:req.body.duration,
                    specialization:req.body.specialization,
                    certificate:req.body.certificate
           },
           //section C
           speakTongue:req.body.speakTongue,
           concepts:{
                hermeneutics:req.body.hermeneutics,
                salvation:req.body.salvation,
                church:req.body.church,
                discipleship:req.body.discipleship,
                gift:req.body.gift,
           },
           understanding:req.body.understanding,
           thinkMinistry:req.body.thinkMinistry,
           planMinistry:req.body.planMinistry,
           expectation:req.body.expectation,
           objectives:req.body.objectives,
           //section D
           TOC:req.body.TOC
       } 
const newForm = new Form(formData)
try{
    const savedForm = await newForm.save();
    res.status(200).json({message:"Form succesfully created", savedForm})
   }
   catch(err){
       res.status(500).json(err)
   }
})

//UPDATES
router.put("/update/form/:id", verifyToken, upload.none(), async (req,res) =>{
    const userId = req.user.id
    const user = await User.findById( userId);

    if(!user) return res.status(404).json({message: "User does not exist"})
    let form = await Form.findById(req.params.id)
    if (form){
    try{

    const updatedForm = await Form.findByIdAndUpdate(req.params.id, {
        $set: {
            firstName:req.body.firstName || form.firstName,
            lastName:req.body.lastName || form.lastName,
            gender:req.body.gender || form.gender,
            city:req.body.city || form.city,
            DOB:{
                day:req.body.day || form.DOB.day,
                month: req.body.month || form.DOB.month,
                year:req.body.year || form.DOB.year
            },
            maritalStatus:req.body.maritalStatus || form.maritalStatus,
            education:req.body.education || form.education,
            occupation: req.body.occupation || form.occupation,
            knowCBC: req.body.knowCBC || form.knowCBC,
            //Section B
            salvationExperience:req.body.salvationExperience,
            priorDenomination:req.body.priorDenomination,
            pastorName: req.body.pastorName,
            pastorChurch:req.body.pastorChurch,
            pastorTown:req.body.pastorTown,
            currentLocalChurch:req.body.currentLocalChurch,
            currentLocalPastor:req.body.currentLocalPastor,
            curentChurchLocation:req.body.curentChurchLocation,
            churchRole:req.body.churchRole,
            churchRoleDuration:req.body.churchRoleDuration,
            commitmentPlan:req.body.commitmentPlan,
            affiliationName:req.body.affiliationName,
            affiliationPastor:req.body.affiliationPastor,
            affiliationPurpose:req.body.affiliationPurpose,
            affiliationLocation:req.body.affiliationLocation,
            affiliationCommitmentPlan:req.body.affiliationCommitmentPlan,
            affiliationCommitmentLevel:req.body.affiliationCommitmentLevel,
            scholarshipMinistry:req.body.scholarshipMinistry,
            scholarship:{
                     date:req.body.date,
                     duration:req.body.duration,
                     specialization:req.body.specialization,
                     certificate:req.body.certificate
            },
            //section C
            speakTongue:req.body.speakTongue,
            concepts:{
                 hermeneutics:req.body.hermeneutics,
                 salvation:req.body.salvation,
                 church:req.body.church,
                 discipleship:req.body.discipleship,
            },
            understanding:req.body.understanding,
            expectation:req.body.expectation,
            objectives:req.body.objectives,
            //section D
            TOC:req.body.TOC
        }
    }, {new: true});
    res.status(200).json(updatedForm);
}catch(err){
    res.status(500).json(err)
}
}else{
    return res.status(404).json({message: "Form does not exist"})
}

})

router.delete("/delete/form/:id", verifyToken, async (req,res) =>{
    const userId = req.user.id
    const user = await User.findById(userId);
    if(user){
            try{
        await Form.findByIdAndDelete(req.params.id)
        res.status(200).json("Form has been deleted")
    }catch(err){
        res.status(500).json(err)
    }}else{
        return res.status(404).json({message: "Form does not exist"})
    }

})

router.get("/find/:id", verifyToken, async (req,res) =>{
    try{
        const form = await Form.findById(req.params.id)
        res.status(200).json(form)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/all/forms", verifyToken, async (req,res) =>{
    try{
        const forms = await Form.find()
        res.status(200).json(forms)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/search/forms',(req,res)=>{  
try {  
    Form.find({$or:[{firstName:{'$regex':req.query.dsearch}},{lastName:{'$regex':req.query.dsearch}}]},(err,forms)=>{  
 if(err){  
    console.log(err); }else{  
        res.status(200).json(forms);} })  
} catch (error) {  
    console.log(error); }  
});  


module.exports = router