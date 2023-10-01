function fetchLikedVideos(): VideoInfo[] {
  try {
    const result = YouTube.Videos!.list("snippet", {
      myRating: "like",
      maxResults: 10,
    });
    if (!result.items) {
      return [];
    }
    const isFilled = <T>(t: T | null): t is T => t !== null;
    return result.items.map(transformer_).filter(isFilled);
  } catch (e) {
    console.error(`Fetch failed: ${(e as Error).message}`);
    return [];
  }
}

function transformer_(
  result: Pick<GoogleAppsScript.YouTube.Schema.Video, "id" | "snippet">
): VideoInfo | null {
  if (!result.id || !result.snippet) {
    return null;
  }
  return {
    id: result.id,
    title: result.snippet.title ?? "",
    // see https://gist.github.com/dgp/1b24bf2961521bd75d6c
    categoryId: result.snippet.categoryId ?? "unknown",
  };
}
