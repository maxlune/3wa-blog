import express from "express";
import postRoutes from "./postRoutes";
import userRoutes from "./userRoutes";

const router = express.Router()

router.use(postRoutes);
router.use(userRoutes);

export default router;