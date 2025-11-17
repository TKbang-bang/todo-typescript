import axios from "axios";
import api from "./api.service";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "./token.service";

export const signup = async (name, email, password) => {
  try {
    const res = await axios.post("/auth/signup", { name, email, password });
    if (res.status !== 200)
      return {
        ok: false,
        message: res.data.message,
      };

    // saving accessToken
    setAccessToken(res.data.accessToken);

    return {
      ok: true,
      message: res.data.message,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const login = async (email, password) => {
  try {
    const res = await axios.post("/auth/login", { email, password });
    if (res.status !== 200)
      return {
        ok: false,
        message: res.data.message,
      };

    // saving accessToken
    setAccessToken(res.data.accessToken);

    return {
      ok: true,
      message: res.data.message,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const sessionCheck = async () => {
  try {
    const res = await axios.get("/protected/verify", {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    if (res.status !== 200) return { ok: false, message: res.data.message };

    // saving accessToken
    setAccessToken(res.headers["access-token"].split(" ")[1]);

    return {
      ok: true,
      message: res.data.message,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const logout = async () => {
  try {
    const res = await api.get("/logout");
    if (res.status !== 204) return { ok: false, message: res.data.message };

    // removing accessToken
    setAccessToken(null);
    removeAccessToken();

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
