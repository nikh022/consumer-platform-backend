import { prisma } from "../config/database.js";

export const userRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  create(data: any) {
    return prisma.user.create({ data });
  },

  findProfileById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
        farmerProfile: {
          select: {
            id: true,
            farmName: true,
            address: true,
            city: true,
          },
        },
      },
    });
  },
};
