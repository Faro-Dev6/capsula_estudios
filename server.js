import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory simple database simulation
const transactions = [];
const customReviews = [
  { id: 1, movie: "El Eco de las Sombras", user: "Sofía M.", rating: 5, comment: "Una obra de arte visual. La atmósfera oscura y elegante me atrapó desde el primer segundo." },
  { id: 2, movie: "Origen Silencioso", user: "Martín R.", rating: 4, comment: "Precioso cortometraje. El diseño sonoro y el manejo del foco son excepcionales." }
];

// Seed initial movie catalog
const moviesDb = [
  {
    id: "eco-sombras",
    title: "El Eco de las Sombras",
    type: "pelicula",
    duration: "1h 42min",
    year: 2025,
    genre: "Thriller Psicológico",
    director: "Juan Martín",
    rating: "SAM 16",
    synopsis: "En las profundidades de un faro abandonado, un cineasta obsesionado descubre cintas de celuloide que documentan sucesos que aún no han ocurrido. Cada proyección consume un pedazo de su propia realidad.",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800",
    backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1600",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    vimeoId: "76239102",
    price: 4500,
    reviews: [
      { user: "Carlos G.", rating: 5, comment: "De lo mejor del cine independiente argentino de los últimos años." }
    ]
  },
  {
    id: "origen-silencioso",
    title: "Origen Silencioso",
    type: "corto",
    duration: "24min",
    year: 2026,
    genre: "Drama / Ciencia Ficción",
    director: "Guillermo Del Mar",
    rating: "SAM 13",
    synopsis: "La primera señal extraterrestre llega a un radiotelescopio andino, pero no contiene sonido ni imágenes. Es un código binario que apaga sistemáticamente todo recuerdo de la infancia en quienes lo escuchan.",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    vimeoId: "12345678",
    price: 1800,
    reviews: []
  },
  {
    id: "cronos-loop",
    title: "Cronos Loop",
    type: "pelicula",
    duration: "1h 55min",
    year: 2024,
    genre: "Ciencia Ficción / Intriga",
    director: "Sofía Coppola",
    rating: "ATP",
    synopsis: "Un relojero de alta precisión en San Telmo descubre que puede revivir los últimos 60 segundos de su vida a voluntad. Los problemas comienzan cuando encuentra a un cliente que está experimentando el exacto bucle invertido.",
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800",
    backdrop: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1600",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    vimeoId: "87654321",
    price: 3800,
    reviews: []
  },
  {
    id: "susurros-viento",
    title: "Los Susurros del Viento",
    type: "corto",
    duration: "18min",
    year: 2025,
    genre: "Poético / Documental",
    director: "Lucía Soler",
    rating: "ATP",
    synopsis: "Un retrato sónico e hipnótico de la estepa patagónica. El viento como único testigo y narrador de historias olvidadas por la historia oficial.",
    poster: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    backdrop: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    vimeoId: "99887766",
    price: 1200,
    reviews: []
  }
];

// 1. GET ALL MOVIES & REVIEWS
app.get("/api/movies", (req, res) => {
  res.json({
    movies: moviesDb,
    reviews: customReviews
  });
});

// 2. VIMEO API PROXY
app.get("/api/vimeo/:id", async (req, res) => {
  const vimeoId = req.params.id;
  const token = process.env.VIMEO_TOKEN;

  if (!token || token === "TU_VIMEO_TOKEN" || token.trim() === "") {
    return res.json({
      title: "Video de Prueba (Simulado: Vimeo)",
      duration: 1200,
      description: "Esta es una descripción simulada porque no se ha configurado VIMEO_TOKEN.",
      thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1600",
      vimeoConfigured: false
    });
  }

  try {
    const response = await fetch(`https://api.vimeo.com/videos/${vimeoId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Vimeo returned status ${response.status}`);
    }

    const data = await response.json();
    res.json({
      title: data.name,
      duration: data.duration,
      description: data.description,
      thumbnail: data.pictures?.sizes?.[4]?.link || data.pictures?.sizes?.[3]?.link || "",
      vimeoConfigured: true,
      originalData: data
    });
  } catch (error) {
    res.status(500).json({
      error: "Error consultando Vimeo API",
      message: error.message,
      vimeoConfigured: true
    });
  }
});

// 3. MERCADOPAGO PREFERENCE CREATION (CHECKOUT)
app.post("/api/checkout", async (req, res) => {
  const { title, price, isMerch, itemId } = req.body;
  const accessToken = process.env.MP_ACCESS_TOKEN;

  if (!title || !price) {
    return res.status(400).json({ error: "Título y precio son obligatorios" });
  }

  const preferenceData = {
    items: [
      {
        id: itemId || "cinematic-item",
        title: title,
        quantity: 1,
        currency_id: "ARS",
        unit_price: Number(price)
      }
    ],
    back_urls: {
      success: `${process.env.APP_URL || "http://localhost:3000"}/success?item=${encodeURIComponent(title)}&price=${price}`,
      failure: `${process.env.APP_URL || "http://localhost:3000"}/failure`,
      pending: `${process.env.APP_URL || "http://localhost:3000"}/pending`
    },
    notification_url: `${process.env.APP_URL || "http://localhost:3000"}/api/webhook`,
    auto_return: "approved"
  };

  if (!accessToken || accessToken === "TU_TOKEN" || accessToken.trim() === "") {
    const simulatedPreferenceId = `pref_sandbox_${Math.random().toString(36).substr(2, 9)}`;
    const newTx = {
      id: simulatedPreferenceId,
      title,
      price,
      isMerch,
      itemId,
      status: "pending",
      date: new Date().toISOString()
    };
    transactions.push(newTx);

    return res.json({
      id: simulatedPreferenceId,
      init_point: `/checkout-sandbox?pref=${simulatedPreferenceId}&title=${encodeURIComponent(title)}&price=${price}`,
      realMercadoPago: false
    });
  }

  try {
    const mpResponse = await fetch("https://api.mercadopago.com/v1/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(preferenceData)
    });

    if (!mpResponse.ok) {
      throw new Error(`MercadoPago API returned status ${mpResponse.status}`);
    }

    const mpData = await mpResponse.json();
    return res.json({
      id: mpData.id,
      init_point: mpData.init_point,
      realMercadoPago: true
    });
  } catch (err) {
    console.error("MercadoPago execution error:", err);
    const simulatedPreferenceId = `pref_fallback_${Math.random().toString(36).substr(2, 9)}`;
    return res.json({
      id: simulatedPreferenceId,
      init_point: `/checkout-sandbox?pref=${simulatedPreferenceId}&title=${encodeURIComponent(title)}&price=${price}`,
      realMercadoPago: false,
      apiError: err.message
    });
  }
});

// 4. MERCADOPAGO WEBHOOK
app.post("/api/webhook", (req, res) => {
  const data = req.body;
  console.log("🔔 [MercadoPago Webhook Recebido]:", data);
  
  transactions.push({
    id: `notif_${Date.now()}`,
    payload: data,
    date: new Date().toISOString(),
    status: "verified"
  });

  return res.json({
    received: true,
    timestamp: new Date().toISOString()
  });
});

// 5. GET RECENT TRANSACTIONS / NOTIFICATIONS FOR DEV DASHBOARD
app.get("/api/admin/transactions", (req, res) => {
  res.json({
    transactions: transactions
  });
});

// 6. ADD CUSTOM FILM REVIEW
app.post("/api/reviews", (req, res) => {
  const { movie, user, rating, comment } = req.body;
  if (!movie || !user || !rating || !comment) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const newReview = {
    id: customReviews.length + 1,
    movie,
    user,
    rating: Number(rating),
    comment,
    date: new Date().toLocaleDateString('es-AR')
  };
  customReviews.unshift(newReview);
  res.json({ success: true, review: newReview });
});


// MOUNT VITE DEVELOPMENT OR PRODUCTION MIDDLEWARE
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
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
    console.log(`🎬 Capsula Estudios server running on http://localhost:${PORT}`);
  });
}

startServer();
