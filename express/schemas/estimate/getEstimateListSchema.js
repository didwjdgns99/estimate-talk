const { z: zod } = require("zod");

const getEstimateListSchema = zod
  .object({
    // 쿼리는 문자열로 들어오므로 공백 제거 → 숫자 변환 → 양의 정수 검증
    page: zod
      .string()
      .trim()
      .min(1, { message: "페이지 요청 값이 올바르지 않습니다." })
      .transform(Number)
      .pipe(zod.number().int().min(1))
      .default(1),
    limit: zod
      .string()
      .trim()
      .min(1, { message: "조회 개수 요청 값이 올바르지 않습니다." })
      .transform(Number)
      .pipe(zod.number().int().min(1).max(100))
      .default(3),
    searchKeyword: zod.string().trim().default(""),
  })

  //위에 변환값을 가지고 추가 검증을 한다.
  .refine(({ page, limit }) => Number.isSafeInteger((page - 1) * limit), {
    path: ["page"], //어느 필드에서 발생한 오류인지”를 지정하는 옵션
    message: "페이지가 너무 큽니다.",
  });

module.exports = getEstimateListSchema;
