import type { Request, Response } from "express";
import { authService } from "./authService.js";
import { userRepository } from "../user/userRepository.js";
import { generateToken } from "../../shared/utils/jwtUtil.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 3600000, // 1 hour
};

// User registration
export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    const token = generateToken(user.id, user.role);

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error: any) {
    if (error.message === "USER_ALREADY_EXISTS") {
      return res.status(409).json({ message: "User already exists" });
    }
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await authService.login(req.body);
    const token = generateToken(user.id, user.role);

    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error: any) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// User logout
export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ message: "Logout successful" });
};

// Get user profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // Directly call repository for data retrieval
    const user = await userRepository.findProfileById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Profile retrieved", user });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
