import { NextFunction, Request, Response } from "express";
import { CacheService } from "../infra";
import { HTTPResponse } from "../utils";

export function cacheMiddleware(cacheService: CacheService, ttl: number) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            if (req.method !== "GET") return next();

            const key = `cache:${req.originalUrl}`;

            const cacheData = await cacheService.get(key);

            if (cacheData) {
                return HTTPResponse({
                    res,
                    statusCode: 200,
                    data: JSON.parse(cacheData)
                })
            };
            /**
             * Necessário para pegar referência da função sem perder o comportamento
             * ou quebrar o Express caso sobreescreve a mesma
             * 
             * função res.json (envia resposta HTTP, serializa Json, finaliza requisição)
             * 
             * .bind(res) garante referência ao this
             */
            const originalJson = res.json.bind(res);

            /**
             * 
             * @param body 🔥 O body é o dado que o controller envia quando chama res.json(...)
             * @returns 
             */
            res.json = (body: any) => {
                cacheService.set(
                    key,
                    JSON.stringify(body),
                    ttl
                );

                return originalJson(body);
            };

            return next()
        } catch (error) {
            return next()
        }
    }
}