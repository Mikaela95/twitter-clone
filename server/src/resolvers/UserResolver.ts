import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import { context } from "../types.ts/context";
import { createAccessToken, createRefreshToken } from "../auth"

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

  // Testing authentication and access
  @Query(() => String)
  @UseMiddleware()
  bye() {
    return "bye";
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

    // Check that the password matches - currently not working
    /* bcrypt.compare(options.password, user.password)
      .then((res) => {
        if (res) { console.log("correct password") }
      })
      .catch((error) => {
        console.log("Unable to validate users request", error)
      }) */

    const valid = await bcrypt.compare(options.password, user.password);

    if (!valid) {
      throw new Error("bad password");
    }

    res.cookie('rick', createRefreshToken(user), { httpOnly: true })

    return {
      accessToken: createAccessToken(user),
      user
    };
  }

}