const emailParams = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Click here to verify email</a>`,
  };

  return mail;
};

module.exports = emailParams;
