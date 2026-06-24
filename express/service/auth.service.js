/**
 * authService
 * 에러처리는 컨트롤러에서 할 수 있도록 err.code 지정
 * DB에 해당 email의 유저가 있는지 확인 => 없으면 에러처리
 * password 비교 => 없으면 에러처리
 * 시크릿키 여부 확인 => 없으면 에러처리
 * 토큰생성 후 리턴
 */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const ERROR_MESSAGE = {
  EMAIL_NOT_FOUND: "이메일을 찾을 수 없습니다.",
  INVALID_PASSWORD: "비밀번호가 맞지 않습니다.",
  JWT_SECRET_MISSING: "시크릿 키 값이 맞지 않습니다.",
  INVALID_SIGNUP_FORMAT: "잘못된 형식의 회원가입 정보 입니다.",
  EXIST_EMAIL: "이미 존재한 이메일 입니다. ",
  USER_NOT_FOUND: "유저를 찾을 수 없습니다.",
};

async function loginService({ email, password }) {
  const normalizedEmail = String(email ?? "")
    .trim()
    .toLowerCase();

  const rawPassword = String(password ?? "");

  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    const err = new Error(ERROR_MESSAGE.EMAIL_NOT_FOUND);
    err.code = ERROR_MESSAGE.EMAIL_NOT_FOUND;
    err.status = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(rawPassword, user.password);

  if (!isMatch) {
    const err = new Error(ERROR_MESSAGE.INVALID_PASSWORD);
    err.code = ERROR_MESSAGE.INVALID_PASSWORD;
    err.status = 401;
    throw err;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    const err = new Error(ERROR_MESSAGE.JWT_SECRET_MISSING);
    err.code = ERROR_MESSAGE.JWT_SECRET_MISSING;
    err.status = 500;
    throw err;
  }

  const token = jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: "1h",
  });
  return {
    id: user.id,
    token,
  };
}

async function signupService({ name, email, password }) {
  const normalizedEmail = String(email ?? "")
    .trim()
    .toLowerCase();
  const normalizedName = String(name ?? "").trim();
  const rawPassword = String(password ?? ""); // undefined 나 null이면 검사에 문제가 생겨 빈문자열 대체

  if (!normalizedEmail || !rawPassword || !normalizedName) {
    const err = new Error(ERROR_MESSAGE.INVALID_SIGNUP_FORMAT);
    err.code = ERROR_MESSAGE.INVALID_SIGNUP_FORMAT;
    err.status = 400;
    throw err;
  }

  const existUser = await User.findOne({ email: normalizedEmail });

  if (existUser) {
    const err = new Error(ERROR_MESSAGE.EXIST_EMAIL);
    err.code = ERROR_MESSAGE.EXIST_EMAIL;
    err.status = 409;
    throw err;
  }

  /**
   * rate-limit 미들웨어 추가 예정
   */
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const user = await User.create({
    name: normalizedName,
    email: normalizedEmail,
    password: hashedPassword,
    provider: "local",
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

async function meService(userId) {
  const user = await User.findById(userId).select("-password"); //유저정보를 가져올 때 패스워드를 빼서 가져오겠다.

  if (!user) {
    const err = new Error(ERROR_MESSAGE.USER_NOT_FOUND);
    err.status = 404;
    err.code = ERROR_MESSAGE.USER_NOT_FOUND;
    throw err;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

module.exports = { loginService, ERROR_MESSAGE, signupService, meService };
