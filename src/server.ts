import App from "./app";
import { envs } from "./config/envs";
import {
  UsersRoutes
} from "./routes";

const app = new App(
  [
    // Add more routes here
    UsersRoutes.bind(),
  ],
  envs.PORT,
);

app.listen();
