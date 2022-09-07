const nodemailer = require("nodemailer");
require("dotenv").config();

const { MAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "ipanamas@meta.ua",
    pass: MAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (email, verificationToken) => {
  const mailOptions = {
    from: "ipanamas@meta.ua",
    to: email,
    subject: "Verify email",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Click here to verify email</a>`,
  };

  transporter
    .sendMail(mailOptions)
    .then(() => console.log("Message send successful"))
    .catch((err) => console.log(err.message));
};

module.exports = sendEmail;
