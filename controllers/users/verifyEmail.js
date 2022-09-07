const { User } = require("../../models");
const { NotFount } = require("http-errors");
const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw NotFount();
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({ message: "Verification success" });
};

module.exports = verifyEmail;
