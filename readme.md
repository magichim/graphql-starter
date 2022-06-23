# Graphql Starter Kit

- Typescript
- Express
- Prisma
- Mysql

## type

- Read

## mutation

- Create
- Update
- Delete

##### Dev Execute

```
yarn dev
or
yarn swc (using swc)
```

##### Prod Execute

```
yarn build
yarn start
```

##### DB Schema create

```
(After install mysql)
prisma-push
```

##### DB Table Model

###### Table: User

| `id`    | `name`  | `email` |
| ------- | ------- | ------- |
| int(pk) | varchar | varchar |

###### Table: Product

| `id`    | `name`  | `price` | `description` | `deletedAt` |
| ------- | ------- | ------- | ------------- | ----------- |
| int(pk) | varchar | int     | varchar       | timestamp   |

###### Table: Purchase

| `id`    | `userId` | `productId` | `description` | `purchasedAt` |
| ------- | -------- | ----------- | ------------- | ------------- |
| int(pk) | int(fk)  | int(fk)     | varchar       | timestamp     |
