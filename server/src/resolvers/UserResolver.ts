import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { context } from "../types.ts/context";

// @Resolver is a decorator - the class you define after this will behave as a controller

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string
}

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

  // Create a user
  @Mutation(() => User)
  async createUser(@Arg("options") options: UsernamePasswordInput) {
    const hashedPassword = bcrypt.hashSync(options.password, bcrypt.genSaltSync(10));
    return User.create({ username: options.username, password: hashedPassword }).save();
  }

  @Mutation(() => LoginResponse)
  async loginUser(@Arg("options") options: UsernamePasswordInput, @Ctx() { res }: context) {
    const user = await User.findOne({ where: { username: options.username } });

    // Check to see if user is created
    if (!user) {
      throw new Error("Could not find user")
    }

    // To-do: check that the password matches

    res.cookie('rick', sign({ userId: user.id }, 'oiueowjlscfewg', { expiresIn: "7d" }), { httpOnly: true })

    return {
      accessToken: sign({ userId: user.id }, 'mtnvouahroiwjqkl', { expiresIn: "10h" })
    };
  }

}