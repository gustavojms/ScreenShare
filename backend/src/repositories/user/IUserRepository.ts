import { Role } from "@prisma/client";

export interface CreateUserData {
    userName: string;
    email: string;
    password: string;
    role: Role;
}

export interface UserRepository {
    create(data: CreateUserData): Promise<CreateUserData>;
}