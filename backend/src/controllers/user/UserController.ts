import { Request, Response } from "express";
import { PrismaUserRepository } from "../../repositories/user/PrismaUserRepository";
import { CreateUserService } from "../../services/user/CreateUserService";

const prismaUserRepository = new PrismaUserRepository();
const createUserService = new CreateUserService(prismaUserRepository);

export class UserController {
    async create(request: Request, response: Response) {
        const { body } = request;
        const result = await createUserService.execute(body);

        return response.json(result);
    }
}