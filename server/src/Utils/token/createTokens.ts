import jwt from "jsonwebtoken";
import { config } from "../../Config/config";
import { Response } from "express";

// Function to generate access token
export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ id: userId }, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn,
  });
};

// Function to generate refresh token
export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ id: userId }, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
  });
};

// Function to send JWT tokens as cookies
export const sendTokensAsCookies = (res: Response, userId: string) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  // Send the access token as a cookie
  res.cookie("access_token", accessToken, {
    httpOnly: true, // Prevent client-side access to the cookie
    secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 24 * 60 * 60 * 1000, // Max age in milliseconds
  });

  // Send the refresh token as a cookie
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true, // Prevent client-side access to the cookie
    secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 24 * 60 * 60 * 1000, // Max age in milliseconds
  });
};

// Function to verify access token
export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.jwt.accessSecret);
};

// Function to verify refresh token
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.jwt.refreshSecret);
};
