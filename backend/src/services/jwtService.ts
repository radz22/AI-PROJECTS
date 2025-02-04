import jwt from "jsonwebtoken";
import "dotenv/config";

const secretKey: string | any = process.env.JWTKEY;

export const generateToken = (
  payload: object,
  expiresIn: string | number = "1d"
) => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey) as { id: string };
  } catch (err) {
    throw new Error("token expired");
  }
};
