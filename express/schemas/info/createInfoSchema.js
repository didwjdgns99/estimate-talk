const { z: zod } = require("zod");

const createInfoSchema = zod.object({
  companyName: zod
    .string()
    .trim()
    .min(1, { message: "회사명을 입력해주세요." }),
  businessNumber: zod
    .string()
    .trim()
    .transform((value) => value.replaceAll("-", ""))
    .pipe(
      zod
        .string()
        .regex(/^\d{10}$/, {
          message: "사업자등록번호 형식이 올바르지 않습니다.",
        }),
    ), // ^문자열 시작과 $ 끝 사이에 \d{10} 숫자 10자리만 허용
  ceoName: zod
    .string()
    .trim()
    .min(1, { message: "대표자 이름을 입력해주세요" }),
  businessType: zod.string().trim().min(1, { message: "업태를 입력해주세요." }),
  businessItem: zod.string().trim().min(1, { message: "종목을 입력해주세요." }),
  manager: zod.string().trim().min(1, { message: "담당자명을 입력해주세요." }),
  phone: zod
    .string()
    .trim()
    .transform((value) => value.replaceAll("-", ""))
    .pipe(
      zod.string().regex(/^\d{9,11}$/, {
        message: "전화번호는 하이픈 제외 숫자 9~11자리여야 합니다.",
      }),
    ),
  fax: zod
    .string()
    .trim()
    .transform((value) => value.replaceAll("-", ""))
    .pipe(
      zod.string().regex(/^(?:\d{9,11})?$/, {
        message: "팩스번호는 하이픈 제외 숫자 9~11자리여야 합니다.",
      }),
    )
    .optional(),
  mobile: zod
    .string()
    .trim()
    .transform((value) => value.replaceAll("-", ""))
    .pipe(
      zod.string().regex(/^010\d{8}$/, {
        message:
          "휴대폰번호는 하이픈 제외 010으로 시작하는 숫자 11자리여야 합니다.",
      }),
    ),
  email: zod
    .string()
    .trim()
    .pipe(zod.email({ message: "이메일 형식이 올바르지 않습니다." })),
  zipCode: zod
    .string()
    .trim()
    .regex(/^\d{5}$/, {
      message: "우편번호는 숫자 5자리여야 합니다.",
    }),
  address: zod.string().trim().min(1, { message: "주소를 입력해주세요." }),
  detailAddress: zod
    .string()
    .trim()
    .min(1, { message: "상세주소를 입력해주세요." }),
});

module.exports = createInfoSchema;
