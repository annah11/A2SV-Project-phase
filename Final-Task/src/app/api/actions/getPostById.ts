import apiClient from "./apiClient";

export async function getPostById(id: string) {
  try {
    const post = await apiClient.get(`/opportunities/${id}`);
    return post.data;
  } catch (error) {
    console.error("Failed to fetch post:", error);
  }
}
