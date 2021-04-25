import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import { context } from "src/types.ts/context";

// @Resolver is a decorator - the class you define after this will behave as a controller

// Object that is passed in
@InputType()
class UsernamePasswordInput {
  
  @Field()
  username: string

  @Field()
  password: string
}

@Resolver()
export class UserResolver {
  // Get all users
  @Query(() => [User])
  users() {
    return User.find()
  }

  // Ability to create a user
  @Mutation(() => User)
  async createUser(@Arg("options") options: UsernamePasswordInput) {
    const hashedPassword = bcrypt.hashSync(options.password, bcrypt.genSaltSync(10));
    return User.create({ username: options.username, password: hashedPassword }).save();
  }
}