/**
 * req에 email,password 여부 확인 => 없으면 에러처리
 * 서비스에 인자 넘기고 필요한 데이터 await으로 받기
 * 쿠키 res로 넘겨주기
 * 성공 status 리턴해주기
 * catch에서 그외 에러와 500에러 처리
 * 로그아웃에서 cookie clear 해주기
 */
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

    const { id, token } = await loginService({ email, password });

    res.cookie("token", token, {
      httpOnly: true, //JavaScript에서 쿠키 접근 불가
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", //중간보안 간편로그인 허용
      path: "/",
      maxAge: 60 * 60 * 1000, //쿠키 유효시간
    });

    return res.status(200).json({
      isError: false,
      message: "로그인 성공",
      user: { id },
      token,
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

function logoutController(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

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
  logoutController,
  signupController,
  meController,
};
