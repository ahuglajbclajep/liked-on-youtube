function saveVideoIds(videoIds: VideoId[]): void {
  const json = JSON.stringify(videoIds);
  const userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty("likedVideoIds", json);
}

function loadVideoIds(): VideoId[] {
  const userProperties = PropertiesService.getUserProperties();
  const json = userProperties.getProperty("likedVideoIds");
  return json ? JSON.parse(json) : [];
}

/**
 * 引数で指定された関数を1時間毎に実行するための関数
 */
function cron(functionName: string) {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  now.setMinutes(0);
  now.setSeconds(0);
  ScriptApp.newTrigger(functionName).timeBased().at(now).create();
}
