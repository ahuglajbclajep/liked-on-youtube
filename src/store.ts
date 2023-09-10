function saveVideoIds(videoIds: VideoId[]): void {
  const json = JSON.stringify(videoIds);
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty("likedVideoIds", json);
}

function loadVideoIds(): VideoId[] {
  const scriptProperties = PropertiesService.getScriptProperties();
  const json = scriptProperties.getProperty("likedVideoIds");
  return json ? JSON.parse(json) : [];
}
