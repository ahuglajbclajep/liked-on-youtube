declare namespace GoogleAppsScriptOAuth2 {
  interface OAuth2Service {
    generateCodeVerifier(): OAuth2Service;
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
