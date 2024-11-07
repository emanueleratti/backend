const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// MULTER CONFIGURATION FOR CLOUDINARY STORAGE
cloudinary.config({
  cloud_name: "dogjbqmku",
  api_key: "518241889166395",
  api_secret: "jJhpwsHDZFZw4h6ei_y0U8ygaB4",
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "books",
    allowed_formats: ["jpg", "png"],
    public_id: (request, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return `${uniqueSuffix}-${file.originalname.split(".")[0]}`;
    },
  },
});

const uploadCloud = multer({ storage: cloudStorage });

module.exports = uploadCloud;
