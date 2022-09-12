const { EMAIL_VERIFY_URL } = process.env;

const emailParams = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${EMAIL_VERIFY_URL}${verificationToken}" target="_blank">Click here to verify email</a>`,
  };

  return mail;
};

module.exports = emailParams;
