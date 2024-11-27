var client_id = "4ee87eb5643640f2b20936ba1b597e31";
var redirect_uri = "http://localhost:3000/";
var scope = "playlist-modify-public, playlist-modify-private";

var url = "https://accounts.spotify.com/authorize";
url += "?response_type=token";
url += "&client_id=" + encodeURIComponent(client_id);
url += "&scope=" + encodeURIComponent(scope);
url += "&redirect_uri=" + encodeURIComponent(redirect_uri);

const handleLogIn = () => {
  window.location = url;
}; //make the url the access token.

const getAccessToken = () => {
  if (window.location.hash) {
    const url = window.location.hash;
    const paramArray = url.split("=");
    return {
      access_token: paramArray[1].split("&")[0],
      token_type: paramArray[2].split("&")[0],
      expires_in: paramArray[3],
    };
  }
}; //get the access token from the URL.

export { getAccessToken, handleLogIn };

//make refreah into new token each time.
//recall each refresh.



