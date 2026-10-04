import { API_BASE_URL } from "./api";
import { getAuthCookie } from "./getCookies";
import { ApiError } from "./apiError";
import { refreshAccessToken } from "./refreshToken";

type HttpConfig = {
  authRequired?: boolean;
  timeoutMS?: number;
  retryOn401?: boolean;
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

    // ✅ authToken → accessToken
    // ✅ token= → accessToken=
    const accessToken = cookie?.replace(/^accessToken=/, "");

    if (config.authRequired && !accessToken) {
      if (config.retryOn401 !== false) {
        await refreshAccessToken();

        return http(path, options, {
          ...config,
          retryOn401: false,
        });
      }

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

        // ✅ authToken → accessToken
        ...(config.authRequired && accessToken
          ? {
              Cookie: `accessToken=${accessToken}`,
              Authorization: `Bearer ${accessToken}`,
            }
          : {}),

        ...options.headers,
      },
    });

    if (
      res.status === 401 &&
      config.authRequired &&
      config.retryOn401 !== false
    ) {
      await refreshAccessToken();

      return http(path, options, {
        ...config,
        retryOn401: false,
      });
    }

    const contentType = res.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");

    if (!res.ok) {
      const errorBody = isJson
        ? await res.json().catch(() => null)
        : await res.text().catch(() => "");

      throw new ApiError(
        res.status,
        typeof errorBody === "object" && errorBody?.message
          ? errorBody.message
          : "API 요청 실패했습니다.",
      );
    }

    if (!isJson) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.log("ApiError 값:", ApiError);
    console.log("ApiError 타입:", typeof ApiError);
    console.log("실제 error:", error);
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError(408, "요청시간이 초과했습니다.");
    }

    throw new ApiError(500, "알수없는 오류가 발생했습니다.");
  } finally {
    clearTimeout(timeout);
  }
}
