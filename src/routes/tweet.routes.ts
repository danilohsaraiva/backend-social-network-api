import express from 'express';
import { body, param } from 'express-validator';
import { tweetController } from '../containers';
import { likeController } from '../containers/like.container';
import { checkAuth, dataValidation } from '../middlewares';

export class TweetRoutes {
    public static bind() {

        const router = express.Router();

        /**
         * @swagger
         * /tweets:
         *   post:
         *     summary: Create a new tweet
         *     description: Creates a tweet for the authenticated user. It can be a normal tweet or a reply to another tweet.
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
         *                 description: Tweet content (1 to 280 characters)
         *                 example: "This is my first tweet!"
         *               parentId:
         *                 type: string
         *                 format: uuid
         *                 nullable: true
         *                 description: ID of the parent tweet (used for replies or retweets)
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
         *                 content: "This is my first tweet!"
         *                 parentId: null
         *                 createdAt: "2026-04-26T12:00:00.000Z"
         *                 updatedAt: "2026-04-26T12:00:00.000Z"
         *                 author:
         *                   userId: "uuid"
         *                   userName: "Danilo"
         *                   userNickName: "danilo.dev"
         *                   imageUrl: "https://example.com/avatar.png"
         *
         *       400:
         *         description: Validation error
         *         content:
         *           application/json:
         *             example:
         *               success: false
         *               message: "Content is required"
         *
         *       401:
         *         description: Unauthorized (missing or invalid JWT token)
         *         content:
         *           application/json:
         *             example:
         *               success: false
         *               message: "Token is missing or invalid"
         */
        router.post("/tweets",
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
        router.post("/tweets",
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
        )

        /**
         * @swagger
         * /tweets/{id}/likes:
         *   post:
         *     summary: Like a tweet
         *     description: Allows the authenticated user to like a specific tweet by ID
         *     tags:
         *       - Tweets
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
         *         description: ID of the tweet to be liked
         *         example: "550e8400-e29b-41d4-a716-446655440000"
         *
         *     responses:
         *       201:
         *         description: Tweet liked successfully
         *         content:
         *           application/json:
         *             example:
         *               success: true
         *               message: "Tweet liked successfully"
         *               data:
         *                 likeId: "uuid"
         *                 userId: "uuid"
         *                 tweetId: "uuid"
         *                 createdAt: "2026-04-27T12:00:00.000Z"
         *               details: null
         *
         *       400:
         *         description: Validation error
         *         content:
         *           application/json:
         *             example:
         *               success: false
         *               message: "Tweet id must be a valid UUID"
         *               data: null
         *               details:
         *                 - type: "validation"
         *                   field: "id"
         *                   description: "Tweet id must be a valid UUID"
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
         *         description: Tweet not found
         *         content:
         *           application/json:
         *             example:
         *               success: false
         *               message: "Tweet not found"
         *               data: null
         *               details: null
         *
         *       409:
         *         description: Conflict (tweet already liked by user)
         *         content:
         *           application/json:
         *             example:
         *               success: false
         *               message: "You have already liked this tweet"
         *               data: null
         *               details: null
         */
        router.post("/tweets/:id/likes",
            checkAuth,
            dataValidation([
                param('id')
                    .notEmpty().withMessage('Tweet id is required')
                    .isUUID().withMessage('User id must be a valid UUID'),
            ]),
            likeController.like
        )

        /**
         * @swagger
         * /tweets/{id}/likes:
         *   delete:
         *     summary: Unlike a tweet
         *     description: Removes the authenticated user's like from a specific tweet
         *     tags:
         *       - Tweets
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
         *         description: ID of the tweet to remove the like from
         *         example: "550e8400-e29b-41d4-a716-446655440000"
         *
         *     responses:
         *       200:
         *         description: Tweet unliked successfully
         *         content:
         *           application/json:
         *             example:
         *               success: true
         *               message: "Tweet unliked successfully"
         *               data:
         *                 likeId: "uuid"
         *                 tweetId: "uuid"
         *                 createdAt: "2026-04-27T12:00:00.000Z"
         *               details: null
         *
         *       400:
         *         description: Validation error
         *         content:
         *           application/json:
         *             example:
         *               success: false
         *               message: "Tweet id must be a valid UUID"
         *               data: null
         *               details:
         *                 - type: "validation"
         *                   field: "id"
         *                   description: "Tweet id must be a valid UUID"
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
         *         description: Like not found
         *         content:
         *           application/json:
         *             example:
         *               success: false
         *               message: "Like not found"
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
        router.delete("/tweets/:id/likes",
            checkAuth,
            dataValidation([
                param('id')
                    .notEmpty().withMessage('Tweet id is required')
                    .isUUID().withMessage('User id must be a valid UUID'),
            ]),
            likeController.unLike
        )

        return router;
    }
}