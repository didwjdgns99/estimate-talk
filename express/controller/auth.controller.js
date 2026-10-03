/**
 * req에 email,password 여부 확인 => 없으면 에러처리
 * 서비스에 인자 넘기고 필요한 데이터 await으로 받기
 * 쿠키 res로 넘겨주기
 * 성공 status 리턴해주기
 * catch에서 그외 에러와 500에러 처리
 * 로그아웃에서 cookie clear 해주기
 */
const jwt = require("jsonwebtoken");

const {
  loginService,
  signupService,
  meService,
} = require("../service/auth.service");

async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        isError: true,
        message: "이메일과 비밀번호를 입력해주세요.",
      });
    }

    const { user, accessToken, refreshToken } = await loginService({
      email,
      password,
    });

    return res.status(200).json({
      isError: false,
      message: "로그인 성공",
      user: { id: user.id, name: user.name, email: user.email },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("loginController error", error);

    return res.status(error.status || 500).json({
      isError: true,
      code: error.code,
      message: error.message || "서버 오류",
    });
  }
}

function refreshController(req, res) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        isError: true,
        message: "리프레시 토큰이 없습니다.",
      });
    }

    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    const accessSecret = process.env.JWT_SECRET;

    if (!refreshSecret || !accessSecret) {
      return res.status(500).json({
        isError: true,
        message: "시크릿키가 없습니다.",
      });
    }

    const decoded = jwt.verify(refreshToken, refreshSecret);

    const accessToken = jwt.sign(
      {
        id: decoded.id,
      },
      accessSecret, //액세스토큰이 정상이라는 것을 증명하기 위해 시크릿키를 사용하여 서명
      {
        expiresIn: "1h",
      },
    );

    return res.status(200).json({
      isError: false,
      message: "토큰 재발급 성공",
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      isError: true,
      message: "유효하지 않거나 만료된 리프레시 토큰입니다.",
    });
  }
}

function logoutController(req, res) {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", //중간보안 간편로그인 허용
      path: "/",
    };
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    return res.status(200).json({
      isError: false,
      message: "로그아웃 성공",
    });
  } catch (error) {
    console.error("logoutController error:", error);

    return res.status(500).json({
      isError: true,
      message: "로그아웃 실패",
    });
  }
}

async function signupController(req, res) {
  try {
    const { name, email, password } = req.body;

    const result = await signupService({ name, email, password });

    return res.status(201).json({
      isError: false,
      message: "회원가입 성공",
      user: result,
    });
  } catch (error) {
    console.error("signupController error", error);
    return res.status(error.status || 500).json({
      isError: true,
      code: error.code,
      message: error.message || "알수 없는 오류",
    });
  }
}

async function meController(req, res) {
  try {
    const user = await meService(req.user.id);

    return res.status(200).json({
      isError: false,
      user,
    });
  } catch (error) {
    console.error("me controller error", error);
    return res.status(error.status || 500).json({
      isError: true,
      code: error.code,
      message: error.message || "유저 정보 조회 실패",
    });
  }
}

module.exports = {
  loginController,
  refreshController,
  logoutController,
  signupController,
  meController,
};
