export const getVimeoData = async (req, res) => {
  const vimeoId = req.params.id;
  const token = process.env.VIMEO_TOKEN;

  if (!token || token === "TU_VIMEO_TOKEN" || token.trim() === "") {
    return res.json({
      title: "Video de Prueba (Simulado: Vimeo)",
      duration: 1200,
      description:
        "Esta es una descripción simulada porque no se ha configurado VIMEO_TOKEN.",
      thumbnail:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1600",
      vimeoConfigured: false
    });
  }

  try {
    const response = await fetch(
      `https://api.vimeo.com/videos/${vimeoId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Vimeo returned status ${response.status}`);
    }

    const data = await response.json();

    res.json({
      title: data.name,
      duration: data.duration,
      description: data.description,
      thumbnail:
        data.pictures?.sizes?.[4]?.link ||
        data.pictures?.sizes?.[3]?.link ||
        "",
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
};