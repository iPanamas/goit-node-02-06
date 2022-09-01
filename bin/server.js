const mongoose = require("mongoose");
const path = require("path");
const app = require("../app");
const { DB_HOST, PORT = 3000 } = process.env;
const { createFolderIsNotExist } = require("../middlewares");

const tmpDir = path.join(__dirname, "../", "tmp");
const avatarsDir = path.join(__dirname, "../", "public");

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, async () => {
      await createFolderIsNotExist(tmpDir);
      await createFolderIsNotExist(avatarsDir);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
