import { User, UserInfo } from "../models/User";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const AuthService = {
  checkAuth: async (provider?: string, token?: string): Promise<UserInfo> => {
    if (!provider || !token) {
      throw new Error("Provider or token is not defined");
    }

    const response = await fetch(`${API_BASE_URL}/users/@me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Auth-Provider": provider,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json() as Promise<UserInfo>;
  },
};
