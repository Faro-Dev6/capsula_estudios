import express from "express";
import { getMovies } from "../controllers/movies.controller.js";

const router = express.Router();

router.get("/", getMovies);

export default router;