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
         *     summary: Autenticar usuário
         *     description: Realiza o login do usuário com userNickName e password
         *     tags:
         *       - Auth
         * 
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - userNickName
         *               - password
         *             properties:
         *               userNickName:
         *                 type: string
         *                 example: "danilo.dev"
         *               password:
         *                 type: string
         *                 example: "123456"
         * 
         *     responses:
         *       200:
         *         description: Login realizado com sucesso
         *         content:
         *           application/json:
         *             example:
         *               success: true
         *               message: "Login successful"
         *               data:
         *                 accessToken: "jwt.token.exemplo"
         *                 user:
         *                   id: "550e8400-e29b-41d4-a716-446655440000"
         *                   userName: "Danilo Saraiva"
         *                   userNickName: "danilo.dev"
         *               details: null
         * 
         *       400:
         *         description: Erro de validação
         *         content:
         *           application/json:
         *             example:
         *               success: false
         *               message: "Validation error"
         *               data: null
         *               details:
         *                 - type: "validation"
         *                   field: "password"
         *                   description: "Password must be at least 6 characters long"
         *                   location: "body"
         * 
         *       401:
         *         description: Credenciais inválidas
         *         content:
         *           application/json:
         *             example:
         *               success: false
         *               message: "Invalid credentials"
         *               data: null
         *               details: null
         * 
         *       500:
         *         description: Erro interno do servidor
         *         content:
         *           application/json:
         *             example:
         *               success: false
         *               message: "Internal server error"
         *               data: null
         *               details: null
         */
        router.post("/auth/login",
            dataValidation([
                body('userNickName')
                    .notEmpty().withMessage('User nickname is required')
                    .isString().withMessage('User nickname must be a string')
                    .trim(),

                body('password')
                    .notEmpty().withMessage('Password is required')
                    .isString().withMessage('Password must be a string')
                    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
                    .trim()
            ]),
            authController.login
        )

        return router;
    }
}