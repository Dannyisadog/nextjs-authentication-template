import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const get = async (id: number): Promise<User> => {
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

  return user;
};
export const list = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users;
};
export const create = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}): Promise<User> => {
  if (!name) {
    throw new Error("User name is required");
  }

  if (!email) {
    throw new Error("User email is required");
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  return user;
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
