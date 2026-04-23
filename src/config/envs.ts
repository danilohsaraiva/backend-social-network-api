import "dotenv/config";

const port = Number(process.env.PORT);


export const envs = {
    PORT: !isNaN(port) ? port : 3000,
    DATABASE_URL: process.env.DATABASE_URL!,
};