const jwt = require("jsonwebtoken")

const verifyToken = (req,res, next) =>{
    const token = req.cookies.access_token
    if(token){
        //const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT, (err, user) =>{
            if (err) res.status(403).json("Token not valid!")
            req.user = user
            console.log(req.user)
            next();
        })
    }else{
        return res.status(401).json("You are not authenticated, Please Login or Signup!")
    }
}

const verifyTokenAndAuthorization = (req,res,next) =>{
    verifyToken(req,res,()=>{
        if (req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not allowed to do this, please login again")
        }
    })
}
const verifyTokenAndAdmin = (req,res,next) =>{
    verifyToken(req,res,()=>{
        if (req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not allowed to do this, admin only!")
        }
    })
}
module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };