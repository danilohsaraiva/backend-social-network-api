import express from 'express';
import { body, param } from 'express-validator';
import { userController } from '../containers/user.container';
import { checkAuth, dataValidation } from '../middlewares';

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
        *     description: Returns user data based on the provided ID (tweets and followers)
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

        /**
         * @swagger
         * /users/{id}/follow:
         *   post:
         *     summary: Follow a user
         *     description: Allows the authenticated user to follow a specific user by ID
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
         *         schema:
         *           type: string
         *           format: uuid
         *         description: ID of the user to be followed
         *         example: "550e8400-e29b-41d4-a716-446655440000"
         *
         *     responses:
         *       201:
         *         description: User followed successfully
         *         content:
         *           application/json:
         *             example:
         *               success: true
         *               message: "User followed successfully"
         *               data:
         *                 followerId: "uuid"
         *                 followingId: "uuid"
         *                 createdAt: "2026-04-27T12:00:00.000Z"
         *               details: null
         *
         *       400:
         *         description: Validation error
         *         content:
         *           application/json:
         *             example:
         *               success: false
         *               message: "User id must be a valid UUID"
         *               data: null
         *               details:
         *                 - type: "validation"
         *                   field: "id"
         *                   description: "User id must be a valid UUID"
         *                   location: "params"
         *
         *       401:
         *         description: Unauthorized (missing or invalid token)
         *         content:
         *           application/json:
         *             example:
         *               success: false
         *               message: "Token is missing or invalid"
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
         *
         *       409:
         *         description: Conflict (already following user)
         *         content:
         *           application/json:
         *             example:
         *               success: false
         *               message: "You are already following this user"
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
        router.post("/users/:id/follow",
            checkAuth,
            dataValidation([
                param('id')
                    .notEmpty().withMessage('User id is required')
                    .isUUID().withMessage('User id must be a valid UUID'),
            ]),
            userController.follow
        )

        /**
         * @swagger
         * /users/{id}/unfollow:
         *   delete:
         *     summary: Unfollow a user
         *     description: Allows the authenticated user to unfollow a specific user by ID
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
         *         schema:
         *           type: string
         *           format: uuid
         *         description: ID of the user to unfollow
         *         example: "550e8400-e29b-41d4-a716-446655440000"
         *
         *     responses:
         *       200:
         *         description: User unfollowed successfully
         *         content:
         *           application/json:
         *             example:
         *               success: true
         *               message: "User unfollowed successfully"
         *               data:
         *                 followerId: "uuid"
         *                 followingId: "uuid"
         *                 createdAt: "2026-04-27T12:00:00.000Z"
         *               details: null
         *
         *       400:
         *         description: Validation error
         *         content:
         *           application/json:
         *             example:
         *               success: false
         *               message: "User id must be a valid UUID"
         *               data: null
         *               details:
         *                 - type: "validation"
         *                   field: "id"
         *                   description: "User id must be a valid UUID"
         *                   location: "params"
         *
         *       401:
         *         description: Unauthorized (missing or invalid token)
         *         content:
         *           application/json:
         *             example:
         *               success: false
         *               message: "Token is missing or invalid"
         *               data: null
         *               details: null
         *
         *       404:
         *         description: Follow relationship not found
         *         content:
         *           application/json:
         *             example:
         *               success: false
         *               message: "Follow relationship not found"
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
        router.delete("/users/:id/unfollow",
            checkAuth,
            dataValidation([
                param('id')
                    .notEmpty().withMessage('User id is required')
                    .isUUID().withMessage('User id must be a valid UUID'),
            ]),
            userController.unfollow
        )


        /**
         * @swagger
         * /users/{id}/timeline:
         *   get:
         *     summary: Get user timeline
         *     description: |
         *       Retrieves a timeline including the user's tweets and tweets from users they follow.
         *
         *       ⚡ This endpoint is cacheable for a short period because timeline data
         *       does not change every second and can be optimized using HTTP cache or Redis.
         * 
         *       ⏰ Cacheable endpoint (TTL: 60 seconds)
         *
         *     tags:
         *       - Users
         *
         *     security:
         *       - bearerAuth: []
         *
         *     x-cacheable: true
         *     x-cache-ttl: 60
         *
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *           format: uuid
         *         description: ID of the user
         *         example: "550e8400-e29b-41d4-a716-446655440000"
         *
         *     responses:
         *       200:
         *         description: Timeline retrieved successfully
         *         content:
         *           application/json:
         *             example:
         *               success: true
         *               message: "Timeline retrieved successfully"
         *               data:
         *                 - tweetId: "uuid"
         *                   content: "My first tweet"
         *                   createdAt: "2026-05-04T00:00:00.000Z"
         *                   user:
         *                     userId: "uuid"
         *                     userName: "John Doe"
         *                     imageUrl: "https://example.com/avatar.png"
         *               details: null
         *
         *       400:
         *         description: Validation error
         *
         *       401:
         *         description: Unauthorized (missing or invalid token)
         *
         *       404:
         *         description: User not found
         *
         *       500:
         *         description: Internal server error
         */
        router.get("/users/:id/timeline",
            checkAuth,
            dataValidation([
                param('id')
                    .notEmpty().withMessage('User id is required')
                    .isUUID().withMessage('User id must be a valid UUID'),
            ]),
            userController.showTimeLineByID
        )

        return router;
    }
}