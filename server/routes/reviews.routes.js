import express from "express";
import { getPressReviews } from "../controllers/reviews.controller.js";

const router = express.Router();

router.post("/", getPressReviews);

export default router;