const CLIENT_ID = "...";
const CLIENT_SECRET = "...";

/**
 * 初期化したい場合は getService_().reset(); を実行する
 *
 * @see https://github.com/googleworkspace/apps-script-oauth2#1-create-the-oauth2-service
 * @see https://github.com/googleworkspace/apps-script-oauth2/pull/457
 */
function getService_() {
  return (
    OAuth2.createService("Twitter")
      .setAuthorizationBaseUrl("https://twitter.com/i/oauth2/authorize")
      .setTokenUrl("https://api.twitter.com/2/oauth2/token")
      .setClientId(CLIENT_ID)
      .setClientSecret(CLIENT_SECRET)
      .setCallbackFunction("authCallback")
      .setPropertyStore(PropertiesService.getUserProperties())
      .setScope("users.read tweet.read tweet.write")
      // Generate and add code verifier parameters for PKCE
      .generateCodeVerifier()
      .setTokenHeaders({
        Authorization:
          "Basic " + Utilities.base64Encode(CLIENT_ID + ":" + CLIENT_SECRET),
        "Content-Type": "application/x-www-form-urlencoded",
      })
  );
}

/**
 * .setCallbackFunction("authCallback") としているため呼ばれる関数
 * OAuth2 のフローが成功したかどうかをユーザーに表示する
 *
 * @see https://github.com/googleworkspace/apps-script-oauth2#3-handle-the-callback
 */
function authCallback(request: any) {
  const authorized = getService_().handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput("Success!");
  } else {
    return HtmlService.createHtmlOutput("Denied.");
  }
}

/**
 * アカウントと連携するために、最初に一度、手動で実行する
 * 認可用の URL が出力されるので、これにアクセスしてアクセスを許可する
 *
 * @see https://github.com/googleworkspace/apps-script-oauth2#2-direct-the-user-to-the-authorization-url
 */
function runMe() {
  const service = getService_();
  if (!service.hasAccess()) {
    Logger.log(
      "Open the following URL and re-run the script: %s",
      service.getAuthorizationUrl()
    );
  }
}
