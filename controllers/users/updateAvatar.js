const { User } = require("../../models");
const path = require("path");
const fs = require("fs").promises;
const { STATUS_CODES } = require("../../middlewares");
const { OK } = STATUS_CODES;

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({
      status: "success",
      code: OK,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    next(error);
  }
};

module.exports = updateAvatar;
