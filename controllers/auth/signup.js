const { User } = require("../../models");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { STATUS_CODES } = require("../../middlewares");
const { sendEmail } = require("../../helpers");

const { CREATED } = STATUS_CODES;

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }

  const verificationToken = uuidv4();
  const avatarURL = gravatar.url(email);

  const newUser = new User({
    subscription,
    email,
    avatarURL,
    verificationToken,
  });
  newUser.setPassword(password);
  await newUser.save();
  await sendEmail(email, verificationToken);

  res.status(CREATED).json({
    status: "success",
    code: CREATED,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = signup;
