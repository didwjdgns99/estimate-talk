import { API_BASE_URL } from "./api";
import { getAuthCookie } from "./getCookies";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type HttpConfig = {
  authRequired?: boolean;
  timeoutMS?: number;
};

export async function http(
  path: string,
  options: RequestInit = {},
  config: HttpConfig = {},
) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, config.timeoutMS ?? 5000);

  try {
    const cookie = config.authRequired ? await getAuthCookie() : undefined;

    if (config.authRequired && !cookie) {
      throw new ApiError(401, "로그인이 필요합니다.");
    }

    const isFormData = options.body instanceof FormData;

    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      credentials: "include",
      signal: controller.signal,
      headers: {
        ...(options.body && !isFormData
          ? { "Content-Type": "application/json" }
          : {}),
        ...(config.authRequired && cookie ? { Cookie: cookie } : {}),
        ...options.headers,
      },
    });

    const contentType = res.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");

    if (!res.ok) {
      const errorBody = isJson
        ? await res.json().catch(() => null)
        : await res.text().catch(() => "");
      throw new ApiError(
        res.status,
        typeof errorBody === "object" && errorBody?.message //express에서 객체로 에러메세지 보내주면 그걸 쓰고, 아니면 기본 메세지
          ? errorBody.message
          : "API 요청 실패했습니다.",
      );
    }
    if (!isJson) {
      return null;
    }

    return await res.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError(408, "요청시간이 초과했습니다.");
    }
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, "알수없는 오류가 발생했습니다.");
  } finally {
    clearTimeout(timeout);
  }
}
