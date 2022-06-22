import { PrismaClient, Prisma } from "@prisma/client";

export default class ProductService {
  static prisma = new PrismaClient();

  static async getProduct(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
    return product;
  }

  static async getAllProducts() {
    const products = await this.prisma.product.findMany({
      where: {
        deletedAt: null,
      },
    });
    return products;
  }

  static async createProduct(product: Prisma.ProductCreateInput) {
    const newProduct = await this.prisma.product.create({
      data: product,
    });
    return newProduct;
  }

  static async deleteProduct(id: number) {
    const deletedProduct = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return deletedProduct;
  }
}
