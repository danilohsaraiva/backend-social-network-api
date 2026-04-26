import express from 'express';
import { body } from 'express-validator';
import { checkAuth, dataValidation } from '../middlewares';
import { tweetController } from '../containers';


export class TweetRoutes {
    public static bind() {
        const router = express.Router();
        /**
         * @swagger
         * /tweet:
         *   post:
         *     summary: Create a new tweet
         *     description: Creates a tweet for the authenticated user. It can also be a reply to another tweet.
         *     tags:
         *       - Tweets
         *     security:
         *       - bearerAuth: []
         * 
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - content
         *             properties:
         *               content:
         *                 type: string
         *                 description: Tweet content (max 280 characters)
         *                 example: "Hello world, this is my first tweet!"
         *               parentId:
         *                 type: string
         *                 format: uuid
         *                 nullable: true
         *                 description: ID of the parent tweet if this is a reply
         *                 example: "550e8400-e29b-41d4-a716-446655440000"
         * 
         *     responses:
         *       201:
         *         description: Tweet created successfully
         *         content:
         *           application/json:
         *             example:
         *               success: true
         *               message: "Tweet created successfully"
         *               data:
         *                 tweetId: "uuid"
         *                 content: "Hello world, this is my first tweet!"
         *                 parentId: null
         *                 createdAt: "2026-04-26T12:00:00.000Z"
         *                 updatedAt: "2026-04-26T12:00:00.000Z"
         *                 author:
         *                   userId: "uuid"
         *                   userName: "Danilo Saraiva"
         *                   userNickName: "danilo.dev"
         *                   imageUrl: "https://example.com/avatar.png"
         * 
         *       400:
         *         description: Validation error
         *         content:
         *           application/json:
         *             example:
         *               success: false
         *               message: "Validation error"
         *               details:
         *                 - field: "content"
         *                   description: "Content is required"
         * 
         *       401:
         *         description: Unauthorized (missing or invalid JWT token)
         *         content:
         *           application/json:
         *             example:
         *               success: false
         *               message: "Token is missing or invalid"
         */
        router.post(
            "/tweet",
            checkAuth,
            dataValidation([
                body("content")
                    .notEmpty().withMessage("Content is required")
                    .isString().withMessage("Content must be a string")
                    .isLength({ min: 1, max: 280 }).withMessage("Content must be between 1 and 280 characters")
                    .trim(),

                body("parentId")
                    .optional()
                    .isUUID().withMessage("parentId must be a valid UUID")
            ]),
            tweetController.create
        );

        return router;
    }
}