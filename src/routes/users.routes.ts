import express from 'express';
import { body } from 'express-validator';
import { dataValidation } from '../middlewares';
import { userController } from '../containers/user.container';

/**
 *             dataValidation([
                body("fieldString").isString().isLength({ min: 1 }),
                body("fieldNumber").isNumeric().isInt({ min: 0 }),
                body("fieldBoolean").isBoolean(),

                // array of strings
                body("fieldArray").isArray(),
                body("fieldArray.*").isString(),

                // nested object
                body("fieldObject").isObject(),
                body("fieldObject.nestedField1").isString().isLength({ min: 1 }),
                body("fieldObject.nestedField2").isNumeric().isInt({ min: 0 }),

                // optional fields
                body("fieldOptional").optional().isString(),

                // custom validation
                body("fieldCustom").custom((value: any) => {
                    if (value !== "validValue") {
                        throw new Error("fieldCustom must be 'validValue'");
                    }
                    return true;
                }),
            ])
 */


export class UsersRoutes {
    public static bind() {
        const router = express.Router();
        /**
         * @route POST /users
         * @description Endpoint responsável por criar um novo usuário no sistema
         * 
         * Recebe os dados do usuário (name, email e password),
         * envia para o UserController que processa a criação e persiste no banco de dados.
         * 
         * @body {string} name - Nome do usuário
         * @body {string} email - Email do usuário
         * @body {string} password - Senha do usuário
         * 
         * @returns {201} { object } - Usuário criado com sucesso
         * @returns {500} { error: string } - Erro interno do servidor
         * {
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
                body('userName').isString().isLength({ min: 1 }),
                body('userNickName').isString().isLength({ min: 1 }),
                body('password').isString().isLength({ min: 6 }),
                body('imageUrl').optional().isString(),
                body('isActive').isBoolean()
            ]),
            userController.createUser
        )
        return router;
    }
}