import { Arg, Args, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import bcrypt from "bcrypt";
import { context } from "../types.ts/context";
import { createAccessToken, createRefreshToken } from "../auth"
import { verify } from "jsonwebtoken";
import { Tweet } from "../entity/Tweet";
import { User } from "../entity/User"
import { UserResolver } from "./UserResolver";


// Object that is passed in
@InputType()
class TweetInput {

  @Field()
  content: string

}

@Resolver()
export class TweetResolver {
  constructor(
    private userResolver: UserResolver,
  ) { }

  // Broke :( 
  @Query(() => [User])
  async test() {
    return this.userResolver.users();
  }

  // Get all tweets
  @Query(() => [Tweet])
  tweets() {
    return Tweet.find({ relations: ["user"] })

  }

  // Get all tweets associated with a user



  // Create a tweet
  @Mutation(() => Tweet)
  async createTweet(@Arg("options") options: TweetInput) {
    return Tweet.create({ content: options.content}).save();
  }
}