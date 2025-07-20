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
          maxResults: 50,
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

    // 🔹 Step 2: Fetch statistics & contentDetails
    const detailsResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          key: API_KEY,
          part: "contentDetails,statistics",
          id: videoIds.join(","),
        },
      }
    );

    const detailsMap = new Map<
      string,
      { duration: string; views: string; likes: string; comments: string }
    >();

    for (const item of detailsResponse.data.items ?? []) {
      detailsMap.set(item.id, {
        duration: item.contentDetails?.duration ?? "N/A",
        views: item.statistics?.viewCount ?? "0",
        likes: item.statistics?.likeCount ?? "0",
        comments: item.statistics?.commentCount ?? "0",
      });
    }

    // 🔹 Merge Search and Detail Data
    const videos: YouTubeVideo[] = searchItems.map((item: any) => {
      const id = item.id?.videoId;
      const stats = detailsMap.get(id);

      return {
        id: id || "",
        title: item.snippet?.title || "Untitled",
        description: item.snippet?.description || "",
        channelId: item.snippet?.channelId || "",
        channelTitle: item.snippet?.channelTitle || "",
        publishedAt: item.snippet?.publishedAt || "",
        thumbnail: item.snippet?.thumbnails?.high?.url || "",
        duration: stats?.duration || "N/A",
        views: stats?.views || "0",
        likes: stats?.likes || "0",
        comments: stats?.comments || "0",
      };
    });

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
