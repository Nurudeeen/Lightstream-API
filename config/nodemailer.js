require("dotenv").config();
const nodemailer = require("nodemailer");


const user = process.env.user;
const pass = process.env.emailpass;
//console.log({user, pass})
const transport = nodemailer.createTransport(
{
host: 'mail.brannium.tech',
port: 465,
secure: true, // use SSL
auth: {
    user: user,
    pass: pass
},
tls: {
  rejectUnauthorized: false
}
}
);

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for signing up on HQI Store. Please confirm your email by clicking on the following link</p>
        <a href=${process.env.REMOTE_URL}api/auth/confirm/user/${confirmationCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};


module.exports.resetPassword = (lastName,email, ID, token) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: "HQI Store Password Reset",
    html: `<h1>Password Reset Authorization</h1>
        <h2>Hello ${lastName} Please click on the link below to reset your password</h2>
        <a href=http://localhost:5000/api/auth/password/reset/${ID}/${token}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};
