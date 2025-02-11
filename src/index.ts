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

app.set("view engine", "ejs");
app.set("views", __dirname + "/../Views");

const router = express.Router()

router.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

router.get("/test", (req: Request, res: Response) => {
  res.send("Test");
});

router.get("/users", UserListController.list);

// router.post("/posts", PostCreateController.create);
router.get("/posts/new", PostCreateController.new); // Affiche le formulaire
router.post("/posts", PostCreateController.create); // Gère la soumission du formulaire

router.get("/posts", async (req: any, res: any) => {
  try {
    const posts = await PostListController.list();

    if (!posts || posts.length === 0) {
      return res.status(404).send("Aucun article trouvé.");
    }

    return res.render("posts", { title: "Liste des articles", posts });
  } catch (error) {
    console.error("Erreur dans la route /posts:", error);
    res.status(500).send("Erreur lors du chargement des articles.");
  }
});

app.use('/', router);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});