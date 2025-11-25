const API_BASE_URL = "http://10.0.0.194:8080";

export const getImageUrl = (
  imagePath: string | null | undefined
): string | null => {
  if (!imagePath) return null;

  if (imagePath.startsWith("http")) return imagePath;

  const cleanPath = imagePath.replace(/^\/+/, "");

  if (cleanPath.startsWith("activity/")) {
    return `${API_BASE_URL}/uploads/${cleanPath}`;
  }

  return `${API_BASE_URL}/uploads/activity/${cleanPath}`;
};
