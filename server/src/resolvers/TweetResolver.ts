import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import bcrypt from "bcrypt";
import { context } from "../types.ts/context";
import { createAccessToken, createRefreshToken } from "../auth"
import { verify } from "jsonwebtoken";
import { Tweet } from "../entity/Tweet";
import { UserResolver } from "./UserResolver";


// Object that is passed in
@InputType()
class TweetInput {

  @Field()
  content: string

  @Field()
  author: string

}

@Resolver()
export class TweetResolver {
  // Get all tweets
  @Query(() => [Tweet])
  tweets() {
    return Tweet.find()
  }

  // Create a tweet
  /* @Mutation(() => Tweet)
  async createTweet(root, {id}){
    // const currentUser = UserResolver.currentUser
    // @Arg("options") options: TweetInput
  } */
}