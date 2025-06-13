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
