import { verifyAccessToken } from "../utils/token.js";

export const requireAuth = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const user = await verifyAccessToken(token);
    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
