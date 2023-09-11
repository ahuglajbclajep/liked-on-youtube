declare namespace GoogleAppsScriptOAuth2 {
  interface OAuth2 {
    _createService: (serviceName: string) => OAuth2Service;
  }
  interface OAuth2Service {
    generateCodeVerifier(): OAuth2Service;
    _generateCodeVerifier(): OAuth2Service;
    codeVerifier_: string;
  }
}

type VideoInfo = {
  id: string;
  title: string;
  categoryId: string;
};
type VideoId = VideoInfo["id"];

type PostResponseData = {
  data: {
    id: number;
    text: string;
  };
};
