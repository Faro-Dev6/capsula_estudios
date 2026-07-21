import { getVideoMetadata } from "../services/vimeo/index.js";

export const getVimeoData = async (req, res) => {
  try {
    const video = await getVideoMetadata(req.params.id);

    res.json(video);
  } catch (error) {
    console.error("Vimeo Error:", error);

    res.status(500).json({
      error: "Error consultando Vimeo",
      message: error.message,
    });
  }
};