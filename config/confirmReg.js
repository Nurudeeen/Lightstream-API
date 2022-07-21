// const User = require("../models/User")
// const Vendor = require("../models/Vendor")
// const Artisan = require("../models/Artisan")
// const UID = require('generate-unique-id');

// exports.verifyUser = (req, res, next) => {
//     User.findOne({
//       confirmationCode: req.params.confirmationCode,
//     })
//       .then((user) => {
//         console.log(user);
//         if (!user) {
//           return res.status(404).send({ message: "User Not found." });
//         }
//         const id = UID({
//           length: 5,
//           useLetters: true
//         });
//         user.UID = `HQI-USER${id}`
//         user.status = "Active";
//         user.save((err) => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }
//         })
//         return res.status(200).send("You are successfully registered, please close this page");
//       })
//       .catch((e) => console.log("error", e));
//   };

//   exports.verifyVendor = (req, res, next) => {
//     Vendor.findOne({
//       confirmationCode: req.params.confirmationCode,
//     })
//       .then((vendor) => {
//         console.log(vendor);
//         if (!vendor) {
//           return res.status(404).send({ message: "Vendor Not found." });
//         }
//         const id = UID({
//           length: 5,
//           useLetters: true
//         });
//         vendor.status = "Active";
//         vendor.UID = `HQI-VENDOR${id}`
//         vendor.save((err) => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }
//         })
//         return res.status(200).send("You are successfully registered, please close this page");
//       })
//       .catch((e) => console.log("error", e));
//   };

//   exports.verifyArtisan = (req, res, next) => {
//     Artisan.findOne({
//       confirmationCode: req.params.confirmationCode,
//     })
//       .then((artisan) => {
//         console.log(artisan);
//         if (!artisan) {
//           return res.status(404).send({ message: "Artisan Not found." });
//         }
//         const id = UID({
//           length: 5,
//           useLetters: true
//         });
//         artisan.status = "Active";
//         artisan.UID = `HQI-ARTISAN${id}`
//         //service.remove({confirmationCode: req.params.confirmationCode});
//         artisan.save((err) => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }
//         })
//         return res.status(200).send("You are successfully registered, please close this page");
//       })
//       .catch((e) => console.log("error", e));
//   };