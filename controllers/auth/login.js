const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const { STATUS_CODES } = require("../../middlewares");

const { OK } = STATUS_CODES;
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }

  const { subscription } = user;

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: OK,
    token,
    user: {
      email,
      subscription,
    },
  });
};

module.exports = login;
