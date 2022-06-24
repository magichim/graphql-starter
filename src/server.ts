// https://stackoverflow.com/questions/37979489/how-to-watch-and-reload-ts-node-when-typescript-files-change

import { PrismaClient, Prisma } from "@prisma/client";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import fs from "fs";
import { buildSchema } from "graphql";
import path from "path";
import ProductService from "services/ProductService";
import PurchaseService from "services/PurchaseService";
import UserService from "services/UserService";
import { abc } from "test/abc";

const prisma = new PrismaClient();

const gqlSchema = fs.readFileSync(
  path.resolve(__dirname, "../graphql/schema.graphql"),
  { encoding: "utf8" }
);

const schema = buildSchema(gqlSchema);

const root = {
  /**
   * query
   */
  users: () => {
    return UserService.getAllUser();
  },
  product: ({ id }) => {
    return ProductService.getProduct(id);
  },
  allProducts: () => {
    return ProductService.getAllProducts();
  },
  purchased: ({ userId }) => {
    return PurchaseService.getPurchaseList(userId);
  },

  /**
   * mutation
   */
  createUser: ({ input }) => {
    return UserService.createUser({ ...input });
  },
  createProduct: ({ input }) => {
    return ProductService.createProduct({ ...input });
  },
  deleteProduct: ({ id }) => {
    return ProductService.deleteProduct(id);
  },
  purchaseProduct: ({ userId, productId }) => {
    return PurchaseService.purchaseProduct(userId, productId);
  },
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.get("/", (_, res) => {
  res.sendFile("home.html", { root: path.resolve(__dirname, "./view") });
});

app.get("/insert-product", async (_, res) => {
  let product: Prisma.ProductCreateInput;
  product = {
    name: "test",
    price: 1000,
    description: "test desc",
  };

  await prisma.product.create({
    data: product,
  });

  res.json({ result: "finished" });
});

app.listen(4400, () => console.log(`Boot server, ${abc}`));
