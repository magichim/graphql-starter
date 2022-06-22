import { PrismaClient, Prisma } from "@prisma/client";

export default class UserService {
  static prisma = new PrismaClient();

  static async getAllUser() {
    return await this.prisma.user.findMany();
  }

  static async createUser(user: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data: user });
  }
}
