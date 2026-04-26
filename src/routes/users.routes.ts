import express from 'express';
import { body, param } from 'express-validator';
import { userController } from '../containers/user.container';
import { checkAuth, dataValidation } from '../middlewares';
import { tweetController } from '../containers';

export class UsersRoutes {
    public static bind() {
        const router = express.Router();

        /**
        * @swagger
        * /users:
        *   post:
        *     summary: Create a new user
        *     description: Creates a user based on the provided data
        *     tags:
        *       - Users
        * 
        *     requestBody:
        *       required: true
        *       content:
        *         application/json:
        *           schema:
        *             type: object
        *             required:
        *               - userName
        *               - userNickName
        *               - password
        *             properties:
        *               userName:
        *                 type: string
        *                 example: "Danilo Saraiva"
        *               userNickName:
        *                 type: string
        *                 example: "danilo.dev"
        *               password:
        *                 type: string
        *                 example: "123456"
        *               imageUrl:
        *                 type: string
        *                 example: "https://minha-imagem.com/avatar.png"
        *               isActive:
        *                 type: boolean
        *                 example: true
        * 
        *     responses:
        *       201:
        *         description: User created successfully
        *         content:
        *           application/json:
        *             example:
        *               success: true
        *               message: "User created successfully"
        *               data:
        *                 id: "550e8400-e29b-41d4-a716-446655440000"
        *                 userName: "Danilo Saraiva"
        *                 userNickName: "danilo.dev"
        *                 imageUrl: "https://minha-imagem.com/avatar.png"
        *                 isActive: true
        *               details: null
        * 
        *       400:
        *         description: Validation error
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
        *       409:
        *         description: User already exists
        *         content:
        *           application/json:
        *             example:
        *               success: false
        *               message: "User already exists"
        *               data: null
        *               details: null
        * 
        *       500:
        *         description: Internal server error
        *         content:
        *           application/json:
        *             example:
        *               success: false
        *               message: "Internal server error"
        *               data: null
        *               details: null
        */
        router.post("/users",
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
            userController.create
        )
        /**
        * @swagger
        * /users/{id}:
        *   get:
        *     summary: Get user by ID
        *     description: Returns user data based on the provided ID
        *     tags:
        *       - Users
        * 
        *     security:
        *       - bearerAuth: []
        * 
        *     parameters:
        *       - in: path
        *         name: id
        *         required: true
        *         description: User ID in UUID format
        *         schema:
        *           type: string
        *         example: "550e8400-e29b-41d4-a716-446655440000"
        * 
        *     responses:
        *       200:
        *         description: User found successfully
        *         content:
        *           application/json:
        *             example:
        *               success: true
        *               message: "User found successfully"
        *               data:
        *                 id: "550e8400-e29b-41d4-a716-446655440000"
        *                 userName: "Danilo Saraiva"
        *                 userNickName: "danilo.dev"
        *                 imageUrl: "https://minha-imagem.com/avatar.png"
        *                 isActive: true
        *               details: null
        * 
        *       400:
        *         description: Validation error
        *         content:
        *           application/json:
        *             example:
        *               success: false
        *               message: "Validation error"
        *               data: null
        *               details:
        *                 - type: "validation"
        *                   field: "id"
        *                   description: "User id must be a valid UUID"
        *                   location: "params"
        * 
        *       401:
        *         description: Unauthorized
        *         content:
        *           application/json:
        *             example:
        *               success: false
        *               message: "Unauthorized"
        *               data: null
        *               details: null
        * 
        *       404:
        *         description: User not found
        *         content:
        *           application/json:
        *             example:
        *               success: false
        *               message: "User not found"
        *               data: null
        *               details: null
        */
        router.get("/users/:id",
            checkAuth,
            dataValidation([
                param('id')
                    .notEmpty().withMessage('User id is required')
                    .isUUID().withMessage('User id must be a valid UUID')
            ]),
            userController.findById
        )
        router.post("users/tweet",
            checkAuth,
            tweetController.create
        )

        return router;
    }
}