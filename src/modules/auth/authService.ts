import { userRepository } from "../user/userRepository.js";
import { hashPassword, comparePassword } from "../../shared/utils/jwtUtil.js";

export const authService = {
  async register(userData: any) {
    const { email, password, fullName, role } = userData;

    // 1. Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    // 2. Hash the password
    const hashedPassword = await hashPassword(password);

    // 3. Save to database via Repository
    return await userRepository.create({
      email,
      password: hashedPassword,
      fullName,
      role: role || "CONSUMER",
    });
  },

  async login(credentials: any) {
    const { email, password } = credentials;

    // 1. Find user
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    // 2. Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }

    return user;
  },
};
