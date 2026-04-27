import App from "./app";
import { envs } from "./config/envs";
import {
  AuthRoutes,
  UsersRoutes
} from "./routes";

const app = new App(
  [
    // Add more routes here
    UsersRoutes.bind(),
    AuthRoutes.bind(),
  ],
  envs.PORT,
);


app.listen();
