const { z: zod } = require("zod");

// 상세 조회와 삭제에서 같은 경로 파라미터를 검증한다.
const estimateParamsSchema = zod.object({
  estimateId: zod.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "견적서 ID는 24자리 16진수 문자열이어야 합니다.",
  }),
});

module.exports = estimateParamsSchema;
