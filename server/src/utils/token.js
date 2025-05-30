import { createVerifier, createSigner } from "fast-jwt";
import "../config/dotenv.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access-secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh-secret";

const accessTokenSigner = createSigner({
  key: async () => ACCESS_TOKEN_SECRET,
  expiresIn: "1h",
});

const refreshTokenSigner = createSigner({
  key: REFRESH_TOKEN_SECRET,
  expiresIn: "4d",
});

const accessTokenVerifier = createVerifier({ key: ACCESS_TOKEN_SECRET });

const refreshTokenVerifier = createVerifier({ key: REFRESH_TOKEN_SECRET });

export const createAccessToken = async (user) => {
  return accessTokenSigner(user);
};

export function createRefreshToken(payload) {
  return refreshTokenSigner(payload);
}

export function verifyAccessToken(token) {
  return accessTokenVerifier(token);
}

export function verifyRefreshToken(token) {
  return refreshTokenVerifier(token);
}
