import { Role } from "@prisma/client";
import { UserRepository, CreateUserData } from "../../repositories/user/IUserRepository";

export interface CreateUserRequest {
    userName: string;
    email: string;
    password: string;
    role: Role;
}

export class CreateUser {
    constructor(
        private userRepository: UserRepository
    ) {}

    async execute(data: CreateUserRequest) {
        const user = await this.userRepository.create({
            userName: data.userName,
            email: data.email,
            password: data.password,
            role: data.role,
        });

        return user;
    }
}