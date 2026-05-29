import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

import moviesRoutes from "./server/routes/movies.routes.js";
import reviewsRoutes from "./server/routes/reviews.routes.js";
import vimeoRoutes from "./server/routes/vimeo.routes.js";
import checkoutRoutes from "./server/routes/checkout.routes.js";
import adminRoutes from "./server/routes/admin.routes.js";

dotenv.config();

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/api/movies", moviesRoutes);

app.use("/api/reviews", reviewsRoutes);

app.use("/api/vimeo", vimeoRoutes);

app.use("/api/checkout", checkoutRoutes);

app.use("/api/admin", adminRoutes);

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true
      },
      appType: "spa"
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");

    app.use(express.static(distPath));

    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `🎬 Capsula Estudios server running on http://localhost:${PORT}`
    );
  });
}

startServer();