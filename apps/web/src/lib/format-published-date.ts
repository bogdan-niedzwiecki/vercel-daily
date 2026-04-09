export function formatPublishedDate(publishedAt: string) {
  return new Date(publishedAt).toLocaleDateString("en-US", {
    dateStyle: "medium",
  });
}
