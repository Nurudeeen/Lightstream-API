const router = require("express").Router()
const User = require("../models/User")
const Form = require("../models/Form")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
const upload = require("../config/multer");
//const confirmRegistration = require("../config/confirmReg");
const { verifyToken } = require("./verifyToken")

router.post("/user/register", upload.none(), async (req,res)=>{
  //console.log(req.body)
  const formUser= await Form.findOne({firstName: req.body.firstName, lastName:req.body.lastName});
  if(!formUser) return res.status(500).json("Please fill Bible Study form before registering")
  const user= await User.findOne({email: req.body.email});
  if(user) return res.status(401).json("User with this email already exists, please login")
  const { firstName,lastName, email, phone, password, password2} = req.body;
  const token = jwt.sign({ email: email }, process.env.PASS);
  if (password != password2) return res.status(404).json({msg: "password does not match"})
  const newUser = new User({ //create a new user and hashes the password
      firstName: firstName,
      lastName:lastName,
      email: email,
      phone: phone,
      password: CryptoJS.AES.encrypt(password, process.env.PASS).toString(),
      form:formUser._id,
      confirmationCode: token, 
    });
    //console.log(newUser)
try{
    newUser.save((err, user) =>{
       
        res.send({
            message:
              "User was registered successfully!", data: user
          });
          //console.log(user)
          // nodemailer.sendConfirmationEmail(
          //   user.lastName,
          //   user.email,
          //   user.confirmationCode
          // ); 
        

    });

}catch (err){
    console.log(err);
    res.status(500).json(err)
}
})


router.post("/user/login", upload.none(), async (req,res)=>{
console.log(req.body)
try{

    const user= await User.findOne({email: req.body.email}).populate("form");
    if(!user) return res.status(401).json("Cannot find a user with that email, please register")
    
    const hashp = CryptoJS.AES.decrypt(user.password, process.env.PASS)
    const OriginalPassword = hashp.toString(CryptoJS.enc.Utf8)
    
    if (OriginalPassword !== req.body.password) return  res.status(401).json("Wrong credentials")
    
    const accessToken = jwt.sign({
        id:user._id,
        isAdmin: user.isAdmin,
        
    },process.env.JWT, {expiresIn: "3d"});

    const {password, ...others}=user._doc;

    //return res.status(200).json({others, accessToken})
    return res.cookie("access_token", accessToken, { httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    }).status(200).json({ others, message: "Logged in successfully 😊 👌" });

}catch (err){
    console.log(err);
    //res.status(500).json(err)
}
})

router.get("/users",  async (req, res) => {
  await User.find().then((user)=>{
    res.send(user);
  });
});

router.get('/search/users',(req,res)=>{  
  try {  
      User.find({$or:[{firstName:{'$regex':req.query.dsearch}},{lastName:{'$regex':req.query.dsearch}},
      {email:{'$regex':req.query.dsearch}}]},(err,forms)=>{  
   if(err){  
      console.log(err); }else{  
          res.status(200).json(forms);} })  
  } catch (error) {  
      console.log(error); }  
  });  

router.get("/logout", verifyToken, (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
});


//router.get("/auth/confirm/user/:confirmationCode", confirmRegistration.verifyUser)

module.exports = router