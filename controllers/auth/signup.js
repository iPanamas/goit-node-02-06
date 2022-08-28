const { User } = require("../../models");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { STATUS_CODES } = require("../../middlewares");

const { CREATED } = STATUS_CODES;

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }

  const avatarURL = gravatar.url(email);
  const newUser = new User({ subscription, email, avatarURL });
  newUser.setPassword(password);
  newUser.save();

  res.status(CREATED).json({
    status: "success",
    code: CREATED,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

module.exports = signup;
