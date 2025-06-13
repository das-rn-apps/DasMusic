// @/src/api.ts
import { YouTubeVideo } from "@/types";
import axios from "axios";

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

    // 🔹 Step 1: Basic Search
    const searchResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          key: API_KEY,
          part: "snippet",
          maxResults: 25,
          q: `${
            searchQuery || "Indian"
          } "official songs" OR "lyrics" OR "music"`,
          type: "video",
          videoCategoryId: "10",
        },
      }
    );

    const searchItems = searchResponse.data.items ?? [];

    const videoIds = searchItems
      .map((item: any) => item.id?.videoId)
      .filter(Boolean);
    if (videoIds.length === 0) return { videos: [] };

    // 🔹 Step 2: Get duration only
    const detailsResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          key: API_KEY,
          part: "contentDetails",
          id: videoIds.join(","),
        },
      }
    );

    const detailsMap = new Map<string, string>();
    for (const item of detailsResponse.data.items ?? []) {
      detailsMap.set(item.id, item.contentDetails?.duration ?? "N/A");
    }

    // 🔹 Merge and Return
    const videos: YouTubeVideo[] = searchItems.map((item: any) => ({
      id: item.id?.videoId,
      title: item.snippet?.title,
      description: item.snippet?.description,
      channelId: item.snippet?.channelId,
      channelTitle: item.snippet?.channelTitle,
      publishedAt: item.snippet?.publishedAt,
      thumbnail: item.snippet?.thumbnails?.high?.url,
      duration: detailsMap.get(item.id?.videoId) || "N/A",
    }));

    return { videos };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("📛 Axios Error:", error.response?.data || error.message);
    } else {
      console.error("📛 Unknown Error:", error);
    }
    return { videos: [] };
  }
};
