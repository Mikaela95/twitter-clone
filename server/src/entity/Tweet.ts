import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Tweet extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  content: string;

  @Field(type => User, {nullable: true})
  @ManyToOne(() => User, (author: User) => author.tweets)
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  author: User;
}