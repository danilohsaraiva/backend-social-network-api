import { Router } from "express";

export class HealthRoutes {
    static bind() {
        const router = Router();

        router.get("/", (req, res) => {
            res.json({
                success: true,
                message: "API is running 🚀",
            });
        });

        return router;
    }
}