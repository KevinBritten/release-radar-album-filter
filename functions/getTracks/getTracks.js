import axios from "axios";

var Buffer = require("buffer/").Buffer;

async function getAuthToken() {
  var { CLIENT_ID, CLIENT_SECRET } = process.env;
  const token = await axios
    .post(
      "https://accounts.spotify.com/api/token",
      { grant_type: "client_credentials" },
      {
        headers: {
          Authorization:
            "Basic " +
            new Buffer(
              REACT_APP_CLIENT_ID + ":" + REACT_APP_CLIENT_SECRET
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((res) => res.data.access_token);
  return token;
}
async function getTracksApiCall(playlistId, token) {
  const baseUrl = "https://api.spotify.com/v1/playlists/";
  const playlistUri = baseUrl + playlistId;
  const tracks = await axios
    .get(playlistUri, {
      params: {
        access_token: token,
      },
    })
    .then((res) => res.data.tracks.items);
  return tracks;
}

exports.handler = async (event, context) => {
  const { playlistId } = JSON.parse(event.body);
  const token = await getAuthToken();
  const data = await getTracksApiCall(playlistId, token);

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
