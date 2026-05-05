import App from "./app";
import { envs } from "./config/envs";
import {
  AuthRoutes,
  HealthRoutes,
  TweetRoutes,
  UsersRoutes,
} from "./routes";

const app = new App(
  [
    // Add more routes here
    HealthRoutes.bind(),
    UsersRoutes.bind(),
    AuthRoutes.bind(),
    TweetRoutes.bind()
  ],
  envs.PORT,
);

app.listen();
