import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import http from "http"
import { UserListController } from "./Controllers/users/UserListController";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

const router = express.Router()

app.use(router)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/test", (req: Request, res: Response) => {
  res.send("Test");
});

// app.get("/users", (req: Request, res: Response) => {
//   res.send("Test Users")
// })

router.get("/users", UserListController.list)

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});