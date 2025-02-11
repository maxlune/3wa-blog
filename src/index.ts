import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import http from "http"
import {UserListController} from "./Controllers/users/UserListController";
import router from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/test", (req: Request, res: Response) => {
  res.send("Test");
});

app.get("/users", UserListController.list);

app.use('/', router);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});