const infoRoute = require("express").Router();
const multer = require("multer");
const {
  createInfo,
  getInfo,
  checkBusinessStatusController,
} = require("../controller/info.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter(req, file, callback) {
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

    // 허용되지 않은 파일이면 에러를 전달한다.
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error(
        "PNG, JPG, WEBP 이미지 파일만 업로드할 수 있습니다.",
      );

      error.status = 400;

      return callback(error);
    }

    // 허용된 파일이면 업로드를 계속한다.
    callback(null, true);
  },
});

infoRoute.post("/", authMiddleware, upload.single("stamp"), createInfo);
infoRoute.get("/", authMiddleware, getInfo);
infoRoute.post(
  "/business-status",
  authMiddleware,
  checkBusinessStatusController,
);

module.exports = infoRoute;
