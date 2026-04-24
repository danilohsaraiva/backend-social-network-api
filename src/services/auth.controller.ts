import { UserRepository } from "../repositories";

export class AuthService {
    constructor(
        private userRepository: UserRepository
    ) { }
}