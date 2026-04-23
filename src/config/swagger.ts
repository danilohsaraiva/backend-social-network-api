import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Minha API",
            version: "1.0.0",
            description: "Documentação da API",
        },
        servers: [
            {
                url: "http://localhost:3001",
            },
        ],
    },
    apis: ["./src/routes/*.ts"], // onde ele vai ler os comentários
});