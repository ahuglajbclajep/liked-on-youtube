function main() {
  const latestLikedVideos = fetchLikedVideos();
  if (latestLikedVideos.length === 0) return;

  const newLikedVideo = newVideos(latestLikedVideos);
  const newLikedMusic = newLikedVideo.filter((v) => v.categoryId === "10");
  if (newLikedMusic.length === 0) return;

  saveVideoIds(latestLikedVideos.map((v) => v.id));
}

function newVideos(latestVideos: VideoInfo[]): VideoInfo[] {
  const latestVideoIds = latestVideos.map((v) => v.id);
  const prevVideoIds = loadVideoIds();
  const newVideoIds = latestVideoIds.filter((v) => !prevVideoIds.includes(v));
  const newVideos = latestVideos.filter((v) => newVideoIds.includes(v.id));
  return newVideos;
}
