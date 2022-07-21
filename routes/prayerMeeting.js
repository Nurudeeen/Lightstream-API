const router = require("express").Router()

const Prayer = require("../models/PrayerMeeting")

const upload = require("../config/multer");

//const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin}= require("./verifyToken")

//CREATE

router.post("/new/prayer/schedule", upload.none(), async (req,res) => {
   
   const newPrayer = new Prayer({
    name:req.body.name,

    email:req.body.email,

    country:req.body.country,

    time:req.body.time,
    })
try{
    const savedPrayer = await newPrayer.save();
    res.status(200).json({message:"new prayer meeting schedule succesfully created", savedPrayer})
   }
   catch(err){
       res.status(500).json(err)
   }
})

//UPDATES
router.put("/update/prayer/:id", upload.none(), async (req,res) =>{

    let prayer = await Prayer.findById(req.params.id)
    if (prayer){
    try{

    const updatedForm = await Prayer.findByIdAndUpdate(req.params.id, {
        $set: {
            name:req.body.name || prayer.name,
            email:req.body.email || prayer.email,
            country:req.body.country || prayer.country,
            time:req.body.time || prayer.time,
        }
    }, {new: true});
    res.status(200).json(updatedForm);
}catch(err){
    res.status(500).json(err)
}
}else{
    return res.status(404).json({message: "Prayer schedule does not exist"})
}

})

router.delete("/delete/prayer/:id", async (req,res) =>{
    
    try{
        await Prayer.findByIdAndDelete(req.params.id)
        res.status(200).json("Prayer has been deleted")
    }catch(err){
        res.status(500).json(err)
    }}
)

router.get("/find/prayer/:id",  async (req,res) =>{
    try{
        const prayer = await Prayer.findById(req.params.id)
        res.status(200).json(prayer)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/all/prayer", async (req,res) =>{
    try{
        const prayers = await Prayer.find()
        res.status(200).json(prayers)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/search/prayer',(req,res)=>{  
try {  
    Prayer.find({$or:[{name:{'$regex':req.query.dsearch}},{email:{'$regex':req.query.dsearch}}, 
    {country:{'$regex':req.query.dsearch}}]},(err,prayers)=>{  
 if(err){  
    console.log(err); }else{  
        res.status(200).json(prayers);} })  
} catch (error) {  
    console.log(error); }  
});  


module.exports = router