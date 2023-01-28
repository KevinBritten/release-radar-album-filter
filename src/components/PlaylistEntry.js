import { click } from "@testing-library/user-event/dist/click";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";

var Buffer = require("buffer/").Buffer;

const PlaylistEntry = () => {
  const [playlistId, setPlaylistId] = useState("");

  const baseUrl = "https://api.spotify.com/v1/playlists/";

  async function getAuthToken() {
    var { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;
    const token = await axios.post(
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
    );
    return token;
  }
  async function getTracks(playlistId, token) {
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
  function filterAlbums(tracks) {
    const tr = tracks[0];
    console.log(tr.track.album["album_type"]);
    return (
      tracks
        .filter((track) => !(track.track.album["album_type"] === "single"))
        // .filter((track) => true)
        .map((track) => track.track.album)
    );
  }
  async function clickFunction() {
    const token = await getAuthToken().then((d) => d.data.access_token);
    const tracks = await getTracks(playlistId, token);
    const filteredAlbums = filterAlbums(tracks);
    console.log(filteredAlbums);
    return tracks;
  }
  return (
    <div>
      <p>
        Go to your Release Radar playlist in Spotify and click “Share” &gt;
        “Copy link to playlist”. Paste the link into the box below.
      </p>
      <form>
        <input
          type="text"
          required
          onChange={(e) => {
            setPlaylistId(e.target.value);
          }}
          placeholder="Paste playlist link here"
        ></input>
        <Button onClick={clickFunction}>Continue</Button>
      </form>
    </div>
  );
};

export default PlaylistEntry;
