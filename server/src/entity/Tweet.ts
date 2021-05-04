import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Tweet extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => String, {nullable: true})
  @Column()
  content!: string;

  @Field(type => User, {nullable: true})
  @ManyToOne(() => User, (user: User) => user.tweets)
  // @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  user: User;
}