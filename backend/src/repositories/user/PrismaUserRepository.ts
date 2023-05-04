import { prisma } from "../../database/prismaClient"
import { CreateUserData, UserRepository } from "./IUserRepository";

export class PrismaUserRepository implements UserRepository {

    async create(data: CreateUserData): Promise<CreateUserData> {
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

    async findByEmail(email: string): Promise<CreateUserData | null> {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        return user;
    }
}