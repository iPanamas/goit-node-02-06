const { User } = require("../../models");
const { NotFound, BadRequest } = require("http-errors");
const { sendEmail, emailParams } = require("../../helpers");
const { STATUS_CODES } = require("../../middlewares");

const { OK } = STATUS_CODES;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const { verificationToken } = user;

  if (!user) {
    throw new NotFound("Not found");
  }

  if (user.verify) {
    throw BadRequest("Verification has already been passed");
  }

  const mailInfo = emailParams(email, verificationToken);

  await sendEmail(mailInfo);

  res.json({ status: OK, message: "Verification email sent" });
};

module.exports = resendVerifyEmail;
