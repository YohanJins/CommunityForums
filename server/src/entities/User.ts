import { IsEmail, Length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, BeforeInsert } from "typeorm"
import bcrypt from "bcryptjs";
import Post from "./Post";
import Vote from "./Vote";
import BaseEntity from './Entity'

@Entity("users ")
export class User extends BaseEntity {

    @Index()
    @IsEmail(undefined, {message: "Wrong Email format"})
    @Length(1,255, {message: "Cannot be remained blank"})
    @Column({ unique:true })
    email: string;

    @Index()
    @Length(3, 32, {message: "User name should be more than 3 letters"})
    @Column({ unique: true })
    username: string

    @Column()
    @Length(6,255, {message: "Password should be more than 6 letters"})
    password: string

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @OneToMany(() => Vote, (vote) => vote.user)
    votes: Vote[]

    @BeforeInsert()
    async hashPassword() {
      this.password =  await bcrypt.hash(this.password, 6)
    }

}
