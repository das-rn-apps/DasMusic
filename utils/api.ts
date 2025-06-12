// @/src/api.ts
import { YouTubeVideo } from "@/types";
import axios from "axios";

// ✅ Load API key from env
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

if (!API_KEY) {
  console.warn(
    "⚠️ Missing YouTube API key. Set EXPO_PUBLIC_API_KEY in your .env."
  );
}

export const fetchVideos = async (
  searchQuery: string
): Promise<{ videos: YouTubeVideo[] }> => {
  try {
    if (!API_KEY) throw new Error("YouTube API key is undefined.");

    // 🔹 Step 1: Fetch Video IDs via YouTube Search API
    const searchResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          key: API_KEY,
          part: "snippet",
          maxResults: 500, // YouTube API allows max 50 per request here
          q: `${
            searchQuery || "Indian"
          } "official "songs" OR "audio" OR "lyrics" OR "music"`,
          type: "video",
          videoCategoryId: "10", // Music
        },
      }
    );

    const searchItems = searchResponse.data.items ?? [];
    const videoIds = searchItems
      .map((item: any) => item.id?.videoId)
      .filter(Boolean)
      .join(",");

    if (!videoIds) return { videos: [] };

    // 🔹 Step 2: Fetch Full Details
    const detailsResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          key: API_KEY,
          part: "snippet,statistics,contentDetails",
          id: videoIds,
        },
      }
    );

    const detailedVideos = detailsResponse.data.items ?? [];

    // 🔹 Step 3: Sort by view count (descending)
    detailedVideos.sort((a: any, b: any) => {
      const viewsA = parseInt(a.statistics?.viewCount || "0", 10);
      const viewsB = parseInt(b.statistics?.viewCount || "0", 10);
      return viewsB - viewsA;
    });

    return { videos: detailedVideos };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("📛 Axios Error:", error.response?.data || error.message);
    } else {
      console.error("📛 Unknown Error:", error);
    }
    return { videos: [] };
  }
};
