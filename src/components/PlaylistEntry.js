import { useState } from "react";
import Button from "react-bootstrap/Button";
import * as api from "./ApiHelpers.js";

import "../styles/playlist-entry.css";

const PlaylistEntry = ({ loadAlbums }) => {
  const [playlistId, setPlaylistId] = useState("");

  function filterAlbums(tracks) {
    return tracks
      .filter((track) => !(track.track.album["album_type"] === "single"))
      .map((track) => track.track.album);
  }
  async function clickFunction() {
    const token = await api.getAuthToken();
    const tracks = await api.getTracks(playlistId, token);
    const filteredAlbums = filterAlbums(tracks);
    loadAlbums(filteredAlbums);
  }
  function extractId(url) {
    let startIdx = url.indexOf("/playlist/") + 10;
    let endIdx = url.indexOf("?si=");
    return url.substring(startIdx, endIdx);
  }

  return (
    <div className="playlist-entry">
      <p>
        Go to your Release Radar playlist in Spotify and click “Share” &gt;
        “Copy link to playlist”. Paste the link into the box below.
      </p>
      <form>
        <input
          className="form-control"
          type="text"
          required
          onChange={(e) => {
            setPlaylistId(extractId(e.target.value));
          }}
          placeholder="Paste playlist link here"
        ></input>
        <Button onClick={clickFunction}>Continue</Button>
      </form>
    </div>
  );
};

export default PlaylistEntry;
