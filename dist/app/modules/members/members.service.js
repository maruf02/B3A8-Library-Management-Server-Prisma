"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createMember = (memberData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingMember = yield prisma.member.findUnique({
            where: { email: memberData.email },
        });
        if (existingMember) {
            throw new Error("Email is already taken. Please use a different email.");
        }
        const newMember = yield prisma.member.create({
            data: memberData,
        });
        return newMember;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002") {
            throw new Error("Email is already taken. Please use a different email.");
        }
        throw new Error("An unexpected error occurred while creating the member.");
    }
});
const getAllMembers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.member.findMany();
});
const getMemberById = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.member.findUnique({
        where: { memberId },
    });
});
const updateMember = (memberId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.member.update({
        where: { memberId },
        data: updateData,
    });
});
const deleteMember = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.member.delete({
        where: { memberId },
    });
});
exports.memberService = {
    createMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember,
};
