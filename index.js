const express = require ("express");
const cookieParser = require("cookie-parser");
//const fileUpload = require("express-fileupload");
const app = express();
app.use(cookieParser());
//app.use(fileUpload())
require("dotenv").config();
app.use(express.json())
const cors = require("cors");

app.use(cors());
const mongoose = require ("mongoose");
const MONG_URL = process.env.LOCAL_MONGO_URI
//const MONG_URL = process.env.MONG_URL  //For production

const form = require("./routes/form") 
app.use("/api", form)
app.use("/api", require("./routes/authUser"))
app.use("/api", require("./routes/prayerMeeting"))


// app.get("/", (req, res)=>{
//     res.status(200).redirect(process.env.HOME_PAGE)
// })

mongoose.connect(MONG_URL).then (() => console.log("DB connected successfully")).catch((err)=>{
    console.log(err)
});

const port = process.env.PORT || 5000

app.listen (port, () =>{
    console.log(`App running on port ${port}`)
})