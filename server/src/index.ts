import "dotenv/config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import { createAccessToken } from "./auth";


(async () => {
    const app = express();
    app.use(cookieParser());
    app.post("/refresh_token", async (req, res) => {
        // read in the cookie
        const token = req.cookies.rick

        // check that token is passed in
        if (!token) {
            return res.send({ ok: false, accessToken: '' })
        }

        // token hasnt expired and is valid
        let payload: any = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
        } catch (err) {
            console.log(err)
            console.log("this is the catch part")
            return res.send({ ok: false, accessToken: '' })
        }

        // token is valid -> send back an access token
        const user = await User.findOne({ id: payload.userId })

        if (!user) {
            return res.send({ ok: false, accessToken: '' })
        }

        return res.send({ ok: true, accessToken: createAccessToken(user) })
    })

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

    app.listen({ port: 4000 }, () => {
        console.log("express server started on localhost:4000");
    });
})();
