import { AuthControler } from "../controllers";
import { UserRepository } from "../repositories";
import { AuthService } from "../services";

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthControler(authService);

export { authController };