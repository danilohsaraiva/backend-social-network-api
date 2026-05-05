import "express";
import { Pagination } from "./utils";

declare global {
  namespace Express {
    interface Request {

      user?: {
        userId: string;
      };

      pagination?: Pagination;
    }
  }
}

export { };