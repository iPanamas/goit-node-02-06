const { User } = require("../../models");
const { STATUS_CODES } = require("../../middlewares");
const { NotFound, BadRequest } = require("http-errors");

const { OK } = STATUS_CODES;

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw new NotFound("User not found");
  }

  if (user.verify) {
    throw new BadRequest("User already verify");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({ status: OK, message: "Verification successful" });
};

module.exports = verifyEmail;
