import { Request } from "express";
import { LoginDto } from "../../dtos";

/**
 * Representa um usuário autenticado no sistema.
 * A senha nunca deve ser exposta aqui.
 */

export type LoginRequest = Request<{}, {}, LoginDto>;