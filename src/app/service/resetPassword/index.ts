import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const EXP = Math.floor(Date.now() / 1000) + 60 * 10;

export interface VerifyResetPasswordToken {
  data: {
    email: string;
  };
  exp: number;
}

export const generateResetPasswordToken = (email: string) => {
  return jwt.sign(
    {
      exp: EXP,
      data: {
        email,
      },
    },
    JWT_SECRET as string
  );
};

export const verifyResetPasswordToken = (
  token: string
): VerifyResetPasswordToken => {
  try {
    return jwt.verify(token, JWT_SECRET as string) as VerifyResetPasswordToken;
  } catch (e) {
    throw new Error("Token is invalid or expired");
  }
};
