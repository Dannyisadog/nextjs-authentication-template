import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const EXP = Math.floor(Date.now() / 1000) + 60 * 60;

export interface VerifyToken {
  data: {
    email: string;
  };
  exp: number;
}

export const generateVerificationToken = (email: string): string => {
  const token = jwt.sign(
    {
      exp: EXP,
      data: {
        email,
      },
    },
    JWT_SECRET as string
  );
  return token;
};

export const verifyToken = (token: string): VerifyToken | null => {
  try {
    return jwt.verify(token, JWT_SECRET as string) as VerifyToken;
  } catch (error) {
    throw new Error("Invalid token or token expired");
  }
};
