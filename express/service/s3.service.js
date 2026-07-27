const path = require("path");
const crypto = require("crypto");
const s3Client = require("../config/s3.config");
const {
  PutObjectCommand, //s3업로드
  GetObjectCommand, //s3조회
} = require("@aws-sdk/client-s3");
const {
  getSignedUrl, //임시url생성
} = require("@aws-sdk/s3-request-presigner");
async function uploadStamp(file, userId) {
  if (!file) {
    return "";
  }

  //확장자 꺼내기
  const extension = path.extname(file.originalname).toLowerCase();
  //유니크네임 만들기
  const uniqueName = crypto.randomUUID();
  //s3경로 만들기 userId-유니크네임-확장자
  const stampKey = `stamps/${userId}-${uniqueName}${extension}`;
  //업로드 요청정보 만들기 Bucket,Key,Body,ContentType
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: stampKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  });
  await s3Client.send(command);
  return stampKey;
}

async function getStampUrl(stampKey) {
  if (!stampKey) {
    return null;
  }

  const getCommand = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME, // 직인 파일이 저장된 버킷
    Key: stampKey, // DB에서 가져온 직인 파일의 S3 경로
  });

  // 해당 파일에 임시로 접근할 수 있는 URL 생성
  const stampUrl = await getSignedUrl(s3Client, getCommand, {
    expiresIn: 60 * 60, // URL 유효시간: 1시간
  });

  // 프론트에서 이미지 주소로 사용할 URL 반환
  return stampUrl;
}

module.exports = { uploadStamp, getStampUrl };
