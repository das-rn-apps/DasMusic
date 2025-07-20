export const formatPublishedDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // hour12: true,
    // timeZoneName: "short",
  });
};

// @/utils/formatDuration.ts

export function formatDuration(isoDuration: string): string {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;

  const matches = isoDuration.match(regex);
  if (!matches) return "0:00";

  const hours = parseInt(matches[1] || "0", 10);
  const minutes = parseInt(matches[2] || "0", 10);
  const seconds = parseInt(matches[3] || "0", 10);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
