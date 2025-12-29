import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error("Environment variable JWT_SECRET is required");
}

// Function to generate a JWT token
export const generateToken = (userId: string, role: string): string => {
  return jwt.sign({ id: userId, role: role }, SECRET_KEY, { expiresIn: "1h" });
};

// Function to verify a JWT token
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

// Function to hash a password
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Function to compare a password with a hashed password
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
