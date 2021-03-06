import { Arg, Args, Ctx, Field, InputType, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import bcrypt from "bcrypt";
import { context } from "../types.ts/context";
import { createAccessToken, createRefreshToken } from "../auth"
import { verify } from "jsonwebtoken";
import { Tweet } from "../entity/Tweet";
import { User } from "../entity/User"
import { UserResolver } from "./UserResolver";
import { response } from "express";


// Object that is passed in

@InputType({ description: "New tweet associated with user" })
class TweetInput {

  @Field()
  content: string

  /* @Field(() => User)
  user: User */

}

/* @ObjectType()
class TweetResponse {
  @Field()
  content: string

  @Field(() => User)
  user: User
} */

@Resolver()
export class TweetResolver {
  // Get all tweets
  @Query(() => [Tweet])
  tweets() {
    return Tweet.find({ relations: ["user"] })
  }

  // CRUD Operations
  // Create 
  @Mutation(() => Tweet)
  async createTweet(@Arg("options") options: TweetInput) {
    return Tweet.create({ content: options.content}).save();
  }

  /* @Mutation(() => Tweet) - not sure how to fix
  async createTweet(@Arg('content') content: string, @Arg('user', () => User) user: User) {
    return Tweet.create({ content, user })
  } */


  // Update 
  @Mutation(() => Boolean)
  async updateTweet(@Arg("id", () => Int) id: number, @Arg("contentUpdate", () => TweetInput) contentUpdate: TweetInput) {
    await Tweet.update(id, {content: contentUpdate.content});
    return true;
  }

  // Delete
  @Mutation(() => Boolean)
  async deleteTweet(@Arg("id", () => Int) id: number) {
    await Tweet.delete(id);
    return true;
  }
}