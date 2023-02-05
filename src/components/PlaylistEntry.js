import { useState } from "react";
import Button from "react-bootstrap/Button";
import * as api from "./ApiHelpers.js";

import "../styles/playlist-entry.scss";

const PlaylistEntry = ({ loadAlbums }) => {
  const myPlaylistId = "37i9dQZEVXbq7HBpM8RcNy";
  const [playlistId, setPlaylistId] = useState(myPlaylistId);
  const [isLoading, setIsLoading] = useState(false);

  // return an array of albums which are not singles
  function filterAlbums(tracks) {
    return tracks
      .filter((track) => !(track.track.album["album_type"] === "single"))
      .map((track) => track.track.album);
  }

  async function clickFunction() {
    setIsLoading(true);
    const token = await api.getAuthToken();
    const tracks = await api.getTracks(playlistId, token);
    const filteredAlbums = filterAlbums(tracks);
    loadAlbums(filteredAlbums);
    setIsLoading(false);
  }

  function onChangeFunction(e) {
    //use myPlaylistId as default if text box is empty
    const extractedId = extractId(e.target.value)
      ? extractId(e.target.value)
      : myPlaylistId;
    setPlaylistId(extractedId);
  }
  //extract the id from the string copied from Spotify
  function extractId(url) {
    let startIdx = url.indexOf("/playlist/") + 10;
    //"?si=" optional in string, if not found endIdx is end of string
    let endIdx = url.indexOf("?si=") < 0 ? url.length : url.indexOf("?si=");
    return url.substring(startIdx, endIdx);
  }

  return (
    <div className="playlist-entry">
      <p>
        Go to your Release Radar playlist in Spotify and click “Share” &gt;
        “Copy link to playlist”. Paste the link into the box below.
        <br />
        <br />
        You can also just click continue to see the albums recommended for me :)
      </p>
      <form>
        <input
          className="form-control"
          type="text"
          required
          onChange={onChangeFunction}
          placeholder="Paste playlist link here (ie: https://open.spotify.com/playlist/37i9dQZEVXbq7HBpM8RcNy?si=e923c767a1f342b7)"
        ></input>
        <Button onClick={clickFunction}>
          {isLoading && <span>Loading...</span>}
          {!isLoading && <span>Continue</span>}
        </Button>
      </form>
    </div>
  );
};

export default PlaylistEntry;
