import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createMember = async (memberData: any) => {
  try {
    const existingMember = await prisma.member.findUnique({
      where: { email: memberData.email },
    });

    if (existingMember) {
      throw new Error("Email is already taken. Please use a different email.");
    }

    const newMember = await prisma.member.create({
      data: memberData,
    });

    return newMember;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("Email is already taken. Please use a different email.");
    }

    throw new Error("An unexpected error occurred while creating the member.");
  }
};

const getAllMembers = async () => {
  return await prisma.member.findMany();
};

const getMemberById = async (memberId: string) => {
  return await prisma.member.findUnique({
    where: { memberId },
  });
};

const updateMember = async (memberId: string, updateData: any) => {
  return await prisma.member.update({
    where: { memberId },
    data: updateData,
  });
};

const deleteMember = async (memberId: string) => {
  return await prisma.member.delete({
    where: { memberId },
  });
};

export const memberService = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
