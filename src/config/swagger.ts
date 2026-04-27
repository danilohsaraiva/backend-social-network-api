import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
            description: "API documentation",
        },
        servers: [
            {
                url: "http://localhost:3001",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },

            schemas: {
                User: {
                    type: "object",
                    required: ["id", "userName", "userNickName"],
                    properties: {
                        id: {
                            type: "string",
                            format: "uuid",
                            example: "550e8400-e29b-41d4-a716-446655440000",
                        },
                        userName: {
                            type: "string",
                            example: "Danilo Saraiva",
                        },
                        userNickName: {
                            type: "string",
                            example: "danilo.dev",
                        },
                        imageUrl: {
                            type: "string",
                            nullable: true,
                            example: "https://minha-imagem.com/avatar.png",
                        },
                        isActive: {
                            type: "boolean",
                            example: true,
                        },
                    },
                },
                Tweet: {
                    type: "object",
                    required: ["tweetId", "content", "userFk", "createdAt", "updatedAt"],
                    properties: {
                        tweetId: {
                            type: "string",
                            format: "uuid",
                            example: "550e8400-e29b-41d4-a716-446655440000",
                        },
                        content: {
                            type: "string",
                            example: "This is my first tweet!",
                        },
                        parentId: {
                            type: "string",
                            format: "uuid",
                            nullable: true,
                            example: "550e8400-e29b-41d4-a716-446655440000",
                        },
                        userFk: {
                            type: "string",
                            format: "uuid",
                            example: "c2b7f2a0-8a1f-4c6d-9b2c-123456789abc",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-04-26T12:00:00.000Z",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-04-26T12:00:00.000Z",
                        },

                        user: {
                            $ref: "#/components/schemas/User",
                        },

                        replies: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/Tweet",
                            },
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
});