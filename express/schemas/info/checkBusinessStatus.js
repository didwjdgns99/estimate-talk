const { z: zod } = require("zod");

const checkBusinessStatusSchema = zod.object({
  businessNumber: zod
    .string()
    .trim()
    .transform((value) => value.replaceAll("-", ""))
    //superRefine
    .pipe(
      zod.string().regex(/^\d{10}$/, {
        message: "사업자등록번호 형식이 올바르지 않습니다.",
      }),
    ),
});

module.exports = { checkBusinessStatusSchema };
