const { User } = require("../../models");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");
const { STATUS_CODES } = require("../../middlewares");

const { OK } = STATUS_CODES;
const avatarsDir = path.resolve("public/avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}-${originalname}`;
  const resultUpload = path.join(avatarsDir, imageName);
  const avatarURL = path.join("public", "avatars", imageName);

  try {
    await fs.rename(tempUpload, resultUpload);
    await Jimp.read(resultUpload)
      .then((image) => {
        return image.resize(250, 250).write(resultUpload);
      })
      .catch((error) => {
        next(error);
      });
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
