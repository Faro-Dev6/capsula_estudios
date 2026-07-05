const BASE_URL = "https://api.vimeo.com";
const getToken = () => process.env.VIMEO_ACCESS_TOKEN;

export const getVideoMetadata = async (videoId) => {
  const data = await vimeoRequest(`/videos/${videoId}`);

  return {
    id: data.uri?.split("/").pop(),
    title: data.name,
    duration: data.duration,
    description: data.description,
    thumbnail: data.pictures?.sizes?.at(-1)?.link ?? "",
    privacy: data.privacy,
    embed: data.embed,
    link: data.link,
    vimeoConfigured: true,
  };
};

const vimeoRequest = async (endpoint) => {
  const token = getToken();

  if (!token) {
    throw new Error("VIMEO_ACCESS_TOKEN no configurado.");
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.vimeo.*+json",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Vimeo respondió ${response.status}: ${text}`);
  }

  return response.json();
};

export const getVideoFiles = async (videoId) => {
  return await vimeoRequest(`/videos/${videoId}/files`);
};

export const getVideoPrivacy = async (videoId) => {
  const data = await vimeoRequest(`/videos/${videoId}`);

  return data.privacy;
};

export const getVideoTextTracks = async (videoId) => {
  return await vimeoRequest(`/videos/${videoId}/texttracks`);
};