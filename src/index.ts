import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import http from "http"
import {UserListController} from "./Controllers/users/UserListController";
import {PostCreateController} from "./Controllers/posts/PostCreateController";
import {PostListController} from "./Controllers/posts/PostListController";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(express.json());

const router = express.Router()

router.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

router.get("/test", (req: Request, res: Response) => {
  res.send("Test");
});

router.get("/users", UserListController.list);
router.post("/posts", PostCreateController.create);
router.get("/posts", PostListController.list);

app.use('/', router);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});