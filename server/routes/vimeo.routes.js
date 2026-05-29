import express from "express";
import { getVimeoData } from "../controllers/vimeo.controller.js";

const router = express.Router();

router.get("/:id", getVimeoData);

export default router;