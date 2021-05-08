import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import path from "path";
import { MyContext } from "./types";
import { HelloResolver } from "./resolvers/hello";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { Account } from "./entities/Account";
import { AccountResolver } from "./resolvers/account";
import { Book } from "./entities/Book";
import { BookResolver } from "./resolvers/book";
import { graphqlUploadExpress } from "graphql-upload";
import { getBookPage } from "./utils/bookRoutes";
import { Rate } from "./entities/Rate";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "mreaderdcp",
    username: "postgres",
    password: "1234",
    logging: !__prod__,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Account, Book, Rate],
  });
  await conn.runMigrations();

  const app = express();
  app.use("/graphql", graphqlUploadExpress());

  const RedisStore = connectRedis(session);
  const redisClient = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      secret: "dhlkjhdfkqwhjfkelewqj",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
    })
  );

  const bookRouter = express.Router();
  app.use("/api/book/", bookRouter);
  getBookPage(bookRouter);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, AccountResolver, BookResolver],
      validate: false,
    }),
    uploads: false,
    context: ({ req, res }): MyContext => ({
      req,
      res,
      redisClient,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("Server running on port 4000");
  });
};

main().catch((err) => {
  console.log(err);
});
