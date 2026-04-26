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
            },
        },
    },
    apis: ["./src/routes/*.ts"],
});