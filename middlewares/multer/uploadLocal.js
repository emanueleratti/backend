const multer = require("multer");
const path = require("path");

// MULTER CONFIGURATION FOR LOCAL STORAGE
const internalStorage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, path.join(__dirname, "../../uploads"));
  },
  filename: (request, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const uploadLocal = multer({ storage: internalStorage });

module.exports = uploadLocal;
