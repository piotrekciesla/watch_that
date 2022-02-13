import axiosInstance from "./axiosInstance";

export interface RequestToken {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export const login = async () => {
  const response = (await axiosInstance.get("/authentication/token/new")).data;

  localStorage.setItem("request_token", JSON.stringify(response));

  window.location.replace(
    `https://www.themoviedb.org/authenticate/${response.request_token}?redirect_to=${document.URL}`
  );
};

export const createSession = async (request_token: RequestToken) => {
  if (new Date(request_token.expires_at) < new Date()) {
    await login();
    return;
  }
  const { session_id } = (
    await axiosInstance.post("/authentication/session/new", {
      request_token: request_token.request_token,
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
