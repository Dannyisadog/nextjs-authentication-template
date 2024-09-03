import { PrismaClient, User } from "@prisma/client";
import { verifyResetPasswordToken } from "app/service/resetPassword";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const saltRounds = 10;

export const get = async ({
  id,
  email,
}: {
  id?: number;
  email?: string;
}): Promise<User> => {
  if (!id && !email) {
    throw new Error("User id or email is required");
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
      email,
      is_deleted: false,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
export const list = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users;
};
export const create = async ({
  name,
  email,
  password,
  passwordConfirm,
  image,
}: {
  name: string;
  email: string;
  password?: string;
  passwordConfirm?: string;
  image?: string;
}) => {
  let userExists = false;

  try {
    await get({ email });
    userExists = true;
  } catch (e) {
    userExists = false;
  }

  if (userExists) {
    throw new Error("User already exists");
  }

  if (!name) {
    throw new Error("User name is required");
  }

  if (!email) {
    throw new Error("User email is required");
  }

  if (password && password !== passwordConfirm) {
    throw new Error("Passwords do not match");
  }

  if (password) {
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        throw new Error("Error hashing password");
      }

      await prisma.user.create({
        data: {
          name,
          email,
          password: hash,
          image,
        },
      });
    });
  } else {
    await prisma.user.create({
      data: {
        name,
        email,
        image,
      },
    });
  }
};

export const remove = async (id: number) => {
  if (!id) {
    throw new Error("User ID is required");
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
    },
  });
};

export const update = async ({
  id,
  name,
  email,
  image,
  emailVerified,
  password,
}: {
  id: number;
  name?: string;
  email?: string;
  image?: string;
  emailVerified?: Date;
  password?: string;
}) => {
  if (!id) {
    throw new Error("User ID is required");
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      image,
      emailVerified,
      password,
    },
  });
};

interface ResetPasswordParams {
  token: string;
  password: string;
  passwordConfirm: string;
}

export const resetPassword = async (params: ResetPasswordParams) => {
  const { token, password, passwordConfirm } = params;

  const { data } = verifyResetPasswordToken(token);

  const { email } = data;

  if (!token) {
    throw new Error("Token is required");
  }

  if (!password) {
    throw new Error("Password is required");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  if (!passwordConfirm) {
    throw new Error("Password confirmation is required");
  }

  if (password !== passwordConfirm) {
    throw new Error("Passwords do not match");
  }

  const user = await get({ email });

  bcrypt.hash(password, saltRounds, async function (err, hash) {
    if (err) {
      throw new Error("Error hashing password");
    }

    await update({
      id: user.id,
      password: hash,
    });
  });
};
