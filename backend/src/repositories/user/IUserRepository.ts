import { Role } from "@prisma/client";

export interface CreateUserData {
    id: number;
    userName: string;
    email: string;
    password: string;
    role: Role;
}

export interface CreateUser {
    userName: string;
    email: string;
    password: string;
    role: Role;
}

export interface UserRepository {
    create(data: CreateUser): Promise<CreateUser>;
    findByEmail(email: string): Promise<CreateUser | null>;
    delete(id: number): Promise<CreateUserData>;
}