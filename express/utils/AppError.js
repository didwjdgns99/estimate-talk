class AppError extends Error {
  //여라가지 에러케이스를 만들고 이전 에러가 아닌 새로운 에러를 실행하기 위해
  constructor(status, message, code = "APP_ERROR") {
    super(message);

    this.status = status;
    this.code = code;
  }
}
