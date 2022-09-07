const multer = require("multer");
const path = require("path");

const tmpDir = path.resolve("/tmp");

const fileSize = 2097152; // Size uploading file on bytes

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }
    cb(null, false);
  },
  limits: {
    fileSize,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
