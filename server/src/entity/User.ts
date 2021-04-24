import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

// @ObjectType decorator - marks the class as the type known from graphQL SDL

// @Field decorator - declare which properties should be mapped to the GraphQL fields

@ObjectType()
@Entity()
export class User extends BaseEntity {
    
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ type: "text", unique: true })
    username!: string;

    @Field()
    @Column()
    password!: string;

}
