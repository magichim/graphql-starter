import { PrismaClient, Prisma } from "@prisma/client";

export default class PurchaseService {
  static prisma = new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "stdout",
        level: "error",
      },
      {
        emit: "stdout",
        level: "info",
      },
      {
        emit: "stdout",
        level: "warn",
      },
    ],
  });

  static async purchaseProduct(userId: number, productId: number) {
    return await this.prisma.purchase.create({ data: { userId, productId } });
  }

  static async getPurchaseList(userId: number) {
    this.prisma.$on("query", (e) => {
      console.log("Query: " + e.query);
      console.log("Params: " + e.params);
      console.log("Duration: " + e.duration + "ms");
    });

    const purchased = await this.prisma.purchase.findMany({
      where: { userId },
      include: {
        user: true,
        product: true,
      },
    });

    return purchased.filter((data) => data.product.deletedAt === null);
  }
}
