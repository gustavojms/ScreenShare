import { UserRepository, CreateUserData } from "../../repositories/user/IUserRepository";

export class DeleteUserService {
    constructor(
        private userRepository: UserRepository
    ) {}

    async execute(data: CreateUserData["id"]): Promise<CreateUserData> {
        const user = await this.userRepository.delete(data);

        return user;
    }
}