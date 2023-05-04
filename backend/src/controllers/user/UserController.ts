import { Request, Response } from "express";
import { PrismaUserRepository } from "../../repositories/user/PrismaUserRepository";
import { CreateUserService } from "../../services/user/CreateUserService";
import { DeleteUserService } from "../../services/user/DeleteUserService";

const prismaUserRepository = new PrismaUserRepository();
const createUserService = new CreateUserService(prismaUserRepository);
const deleteUserService = new DeleteUserService(prismaUserRepository);

export class UserController {
    async create(request: Request, response: Response) {
        const { body } = request;
        const result = await createUserService.execute(body);

        return response.json(result);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const result = await deleteUserService.execute(Number(id));

        return response.json(result);
    }
}