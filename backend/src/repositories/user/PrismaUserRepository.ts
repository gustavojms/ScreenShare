import { prisma } from "../../database/prismaClient"
import {  UserRepository, CreateUserData, CreateUser } from "./IUserRepository";

export class PrismaUserRepository implements UserRepository {

    async create(data: CreateUserData): Promise<CreateUser> {
        const user = await prisma.user.create({
            data: {
                userName: data.userName,
                email: data.email,
                password: data.password,
                role: data.role,
            }
        });
        return user;
    }

    async findByEmail(email: string): Promise<CreateUser | null> {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        return user;
    }

    async delete(id: number): Promise<CreateUserData> {
        const user = await prisma.user.delete({
            where: {
                id: id
            }
        });
        return user;
    }
}