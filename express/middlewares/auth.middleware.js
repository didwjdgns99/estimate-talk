const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        isError: true,
        message: "로그인이 필요합니다.",
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({
        isError: true,
        message: "시크릿키가 없습니다",
      });
    }

    const decoded = jwt.verify(token, secret);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      isError: true,
      message: "유효하지 않은 토큰입니다.",
    });
  }
}

module.exports = authMiddleware;
/**
 * req.cookies.token으로 가져오기
 * token 검사
 * 시크릿키 검사
 * verify로 검사및 payload 추출
 * next()
 * req.user에 할당
 * catch로 에러처리
 */
