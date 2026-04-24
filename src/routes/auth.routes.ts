import express from 'express';
import { body } from 'express-validator';
import { authController } from "../containers";
import { dataValidation } from '../middlewares';

export class AuthRoutes {
    public static bind() {
        const router = express.Router();

        /**
         * @swagger
         * /auth/login:
         *   post:
         *     summary: User login
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               userNickName:
         *                 type: string
         *                 example: john_wick
         *               password:
         *                 type: string
         *                 example: password123
         *     responses:
         *       200:
         *         description: Login successful
         *       401:
         *         description: Invalid credentials
         *       500:
         *         description: Internal server error
         */

        router.post("/auth/login",
            /*  #swagger.tags = ['Auth']
                #swagger.description = 'Endpoint responsável por autenticar um usuário no sistema. Recebe o nickName e password, valida as credenciais e retorna um token de acesso.'

                #swagger.security = []
                
                #swagger.requestBody = {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/loginSchema"
                            }
                        }
                    }
                }

                #swagger.responses[200] = {
                    description: 'Login realizado com sucesso.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/loginResponse'
                            }
                        }
                    }
                }

                #swagger.responses[400] = {
                    description: 'Requisição inválida, com detalhes dos erros de validação.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error400Response'
                            }
                        }
                    }
                }

                #swagger.responses[401] = {
                    description: 'Credenciais inválidas.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error401Response'
                            }
                        }
                    }
                }

                #swagger.responses[500] = {
                    description: 'Erro interno do servidor.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error500Response'
                            }
                        }
                    }
                }
            */
            dataValidation([
                body('userNickName').isString().withMessage("userNickName is Required"),
                body('password').isString().isLength({ min: 6 }).withMessage("Password has to be more than 6 characters")
            ]),
            authController.login
        )

        return router;
    }
}