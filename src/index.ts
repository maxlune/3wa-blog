import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import http from "http"
import router from "./routes";
import methodOverride from "method-override";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


app.set("view engine", "ejs");
app.set("views", __dirname + "/../Views");


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/test", (req: Request, res: Response) => {
  res.send("Test");
});

app.use('/', router);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});