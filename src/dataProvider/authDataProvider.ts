import axiosInstance from "./axiosInstance";

export interface RequestToken {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export const createSessionWithLoginPassword = async (
  username: string,
  password: string
) => {
  const tokenResponse: RequestToken = (
    await axiosInstance.get("/authentication/token/new")
  ).data;

  const sessionResponse = (
    await axiosInstance.post("/authentication/token/validate_with_login", {
      request_token: tokenResponse.request_token,
      username,
      password,
    })
  ).data;
  await createSession(sessionResponse.request_token);
};

export const createSession = async (request_token: string) => {
  const { session_id } = (
    await axiosInstance.post("/authentication/session/new", {
      request_token: request_token,
    })
  ).data;
  sessionStorage.setItem("session_id", session_id);
};

export const logout = async () => {
  const session_id = sessionStorage.getItem("session_id");

  await axiosInstance.delete("/authentication/session", {
    data: { session_id },
  });
};
