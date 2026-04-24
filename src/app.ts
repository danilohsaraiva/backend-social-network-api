import cors from "cors";
import express from "express";
import { errorMiddleware } from "./middlewares/global-error-validator.middlware";
import { swaggerSpec } from "./config/swagger";
import swaggerUi from 'swagger-ui-express';

class App {
  public app: express.Application;
  public port: number;

  constructor(routers: express.Router[], port: number) {
    this.app = express();
    this.port = port;
    this.initializeSwagger();
    this.initializeMiddlewares();
    this.initializeControllers(routers);

    this.initializeErrorHandler();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private initializeControllers(routers: express.Router[]) {
    routers.forEach((router) => {
      this.app.use(router);
    });
  }

  private initializeErrorHandler() {
    this.app.use(errorMiddleware);
  }

  private initializeSwagger() {
    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  public listen() {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
