import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import cors from 'cors';


(async () => {
    const app = express();

    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
        }),
        context: ({ req, res }) => ({ req, res }),
    });

    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }))

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen({ port: 4000}, () => {
        console.log("express server started on localhost:4000");
    });
})();
