const rateLimit = require("express-rate-limit");

const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  message: {
    isError: true,
    message: "1분에 50회 이상 요청할 수 없습니다.",
  },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    isError: true,
    message: "로그인 시도가 너무 많습니다. 15분 후 다시 시도해주세요.",
  },
});

module.exports = { globalLimiter, loginLimiter };
