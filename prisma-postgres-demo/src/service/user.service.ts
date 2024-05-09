import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (name: string, email: string) => {
  const user = await prisma.user.create({
    data: { name, email },
  });
  return user;
};

const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

const updateUser = async (id: number, name: string, email: string) => {
  const user = await prisma.user.update({
    where: { id },
    data: { name, email },
  });
  return user;
};

const deleteUser = async (id: number) => {
  const user = await prisma.user.delete({
    where: { id },
  });
  return user;
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};