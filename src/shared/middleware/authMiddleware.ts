import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtil.js";

interface User {
  id: string;
  role: string;
}

interface CustomRequest extends Request {
  user?: User;
}

const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  // 1. Extract token from cookies
  const token = req.cookies?.token;

  if (!token) {
    res
      .status(401)
      .json({ message: "Unauthorized: Access denied, no token provided" });
    return;
  }

  try {
    const decodedUser = verifyToken(token);

    if (!decodedUser) {
      res
        .status(401)
        .json({ message: "Unauthorized: Invalid or expired token" });
      return;
    }

    // 3. Attach the user payload to the request for use in controllers
    req.user = decodedUser as User;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ message: "Unauthorized: Authentication failed" });
  }
};

const roleMiddleware = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !roles.includes(user.role)) {
      res.status(403).json({
        message: "Forbidden: You do not have permission to perform this action",
      });
      return;
    }

    next();
  };
};

export { authMiddleware, roleMiddleware };
