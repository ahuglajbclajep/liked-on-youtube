function main() {
  cron("main");

  const latestLikedVideos = fetchLikedVideos();
  if (latestLikedVideos.length === 0) return;

  const newLikedVideo = newVideos(latestLikedVideos);
  const newLikedMusic = newLikedVideo.filter((v) => v.categoryId === "10");
  if (newLikedMusic.length === 0) return;

  for (const { id, title } of newLikedMusic) {
    const videoUrl = `https://www.youtube.com/watch?v=${id}`;
    const text = `Liked on YouTube: ${title}\n${videoUrl}`;
    const result = post(text);
    if (!result) {
      console.error(`Post failed: ${id} "${title}"`);
    }
  }

  saveVideoIds(latestLikedVideos.map((v) => v.id));
}

function newVideos(latestVideos: VideoInfo[]): VideoInfo[] {
  const latestVideoIds = latestVideos.map((v) => v.id);
  const prevVideoIds = loadVideoIds();
  const newVideoIds = latestVideoIds.filter((v) => !prevVideoIds.includes(v));
  const newVideos = latestVideos.filter((v) => newVideoIds.includes(v.id));
  return newVideos;
}
