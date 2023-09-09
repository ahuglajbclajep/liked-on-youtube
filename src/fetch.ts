function fetchLikedVideos(): LikedVide[] {
  try {
    const result = YouTube.Videos!.list("snippet", {
      myRating: "like",
      maxResults: 10,
    });
    if (!result.items) {
      return [];
    }
    return result.items.map(transformer).filter(isFilled);
  } catch (e) {
    console.error(e);
    return [];
  }
}

function transformer(
  result: Pick<GoogleAppsScript.YouTube.Schema.Video, "id" | "snippet">
): LikedVide | null {
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

// see https://github.com/microsoft/TypeScript/issues/16069#issuecomment-565658443
function isFilled<T>(t: T | null): t is T {
  return t !== null;
}
