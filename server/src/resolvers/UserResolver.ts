import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";

// @Resolver is a decorator - the class you define after this will behave as a controller


@Resolver()
export class UserResolver {
  // Get all users
  @Query(() => [User])
  users() {
    return User.find()
  } 

  // Ability to create a user
  /* @Mutation(() => String)
  register(){
    @Arg()
  } */


  // Retrieve a user
}