import express from "express";

import {
  createCheckout,
  webhook
} from "../controllers/checkout.controller.js";

const router = express.Router();

router.post("/", createCheckout);

router.post("/webhook", webhook);

export default router;