import { Role } from "@prisma/client";
import { UserRepository } from "../../repositories/user/IUserRepository";

export interface CreateUserRequest {
    userName: string;
    email: string;
    password: string;
    role: Role;
}

export class CreateUserService {
    constructor(
        private userRepository: UserRepository
    ) {}

    async execute(data: CreateUserRequest) {
        const user = await this.userRepository.findByEmail(data.email);

        if (user) {
            throw new Error("User already exists");
        }

        const userCreated = await this.userRepository.create({
            userName: data.userName,
            email: data.email,
            password: data.password,
            role: data.role,
        });

        return userCreated;
    }
}