import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const createMember = async (memberData: any) => {
  return await prisma.member.create({
    data: memberData,
  });
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
