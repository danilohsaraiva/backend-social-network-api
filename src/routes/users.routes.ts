import express from 'express';
import { body } from 'express-validator';
import { userController } from '../containers/user.container';
import { dataValidation } from '../middlewares';

export class UsersRoutes {
    public static bind() {
        const router = express.Router();
        /**
             * @swagger
             * /users:
             *   post:
             *     summary: Create user
             *     tags: [Users]
             *     requestBody:
             *       required: true
             *       content:
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               userName:
             *                 type: string
             *                 example: John Wick
             *               userNickName:
             *                 type: string
             *                 example: john_wick
             *               password:
             *                 type: string
             *                 example: password123
             *               imageUrl:
             *                 type: string
             *                 example: https://site.com/foto.png
             *     responses:
             *       201:
             *         description: Created
             *       409:
             *         description: User already exists
             *       500:
             *         description: Internal serve 
             */

        router.post("/users",
            /*  #swagger.tags = ['Users']
                #swagger.description = 'Endpoint responsável por criar um novo usuário no sistema. Recebe os dados do usuário (name, email e password), envia para o UserController que processa a criação e persiste no banco de dados.'

                #swagger.security = []
                
                #swagger.requestBody = {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/createUserSchema"
                            }
                        }
                    }
                }

                #swagger.responses[201] = {
                    description: 'Usuário criado com sucesso.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/createUserResponse'
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

                #swagger.responses[409] = {
                    description: 'Conflito, email já existe.',
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/Error409Response'
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
                body('userName')
                    .isString().withMessage('userName must be a string')
                    .isLength({ min: 1 }).withMessage('userName is required'),

                body('userNickName')
                    .isString().withMessage('userNickName must be a string')
                    .isLength({ min: 1 }).withMessage('userNickName is required'),

                body('password')
                    .isString().withMessage('password must be a string')
                    .isLength({ min: 6 }).withMessage('password must be at least 6 characters long'),

                body('imageUrl')
                    .optional()
                    .isString().withMessage('imageUrl must be a string'),

                body('isActive')
                    .optional()
                    .isBoolean().withMessage('isActive must be a boolean')
            ]),
            userController.createUser
        )
        return router;
    }
}