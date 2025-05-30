import User from "./../models/User.js";
import {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../../utils/token.js";
import { comparePassword } from "../../utils/crypto.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password"' });
    }

    const isPasswordMatch = comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const accessToken = await createAccessToken(user);
    const refreshToken = await createRefreshToken(user);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/auth/refresh-token",
      secure: false,
      maxAge: 4 * 24 * 60 * 60 * 1000,
    });
    res.json({ message: "Logged in" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMe = (req, res) => {
  res.json(req.user);
};

export const check = (req, res) => {
  res.json({ message: "thanh cong" });
};

export const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken", { path: "/auth/refresh-token" });
  res.json({ message: "Logged out" });
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "Không có refresh token" });
  try {
    const user = verifyRefreshToken(refreshToken);
    const { iat, exp, ...userData } = user;

    const newAccessToken = await createAccessToken(userData);
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1 * 60 * 1000,
    });
    res.json({ message: "Làm mới accessToken thành công" });
  } catch (error) {
    return res.status(403).json({ message: "Refresh token không hợp lệ" });
  }
};
