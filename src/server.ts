import App from "./app";
import { envs } from "./config/envs";
import {
  ExampleRoutes
} from "./routes";

const app = new App(
  [
    ExampleRoutes.bind(),
    // Add more routes here
  ],
  envs.PORT,
);

app.listen();
