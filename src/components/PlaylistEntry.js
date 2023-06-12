import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import * as api from "./ApiHelpers.js";

import "../styles/playlist-entry.scss";

const PlaylistEntry = ({ loadAlbums }) => {
  const defaultPlaylistId = process.env.REACT_APP_DEFAULT_PLAYLIST_ID;
  const rememberedPlaylist = localStorage.getItem("playlistId");
  const [playlistId, setPlaylistId] = useState(
    rememberedPlaylist || defaultPlaylistId
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [rememberPlaylist, setRememberPlaylist] = useState(rememberedPlaylist);

  //Reset albums array when component is loaded so that the r esults don't automatically load again if the user uses the back button on their browser
  useEffect(() => {
    loadAlbums(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // return an array of albums which are not singles without including duplicates
  function filterAlbums(tracks) {
    const albums = tracks
      .filter((track) => !(track.track.album["album_type"] === "single"))
      .map((track) => track.track.album);
    const uniqueAlbums = albums.reduce((acc, curr) => {
      if (!acc.some((album) => album.name === curr.name)) {
        acc.push(curr);
      }
      return acc;
    }, []);
    return uniqueAlbums;
  }

  async function clickFunction() {
    //prevent function from running if already loading.
    if (isLoading) return;
    // Set isLoading to true while waiting for api call.
    setIsLoading(true);
    const tracks = await api.getTracks(playlistId).catch(() => {
      setShowErrorMessage(true);
      setIsLoading(false);
    });
    const filteredAlbums = filterAlbums(tracks);

    //send album to parent component
    if (rememberPlaylist) {
      localStorage.setItem("playlistId", playlistId);
    } else {
      localStorage.removeItem("playlistId");
    }

    loadAlbums(filteredAlbums);
    setIsLoading(false);
  }

  function onChangeFunction(e) {
    //use defaultPlaylistId as default if text box is empty
    const extractedId = extractId(e.target.value)
      ? extractId(e.target.value)
      : defaultPlaylistId;
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
      {!rememberedPlaylist ? (
        <p>
          <span>
            Go to your Release Radar playlist in Spotify and click “Share” &gt;
            “Copy link to playlist”. Paste the link into the box below.
          </span>
          <br />
          <br />

          <span>
            You can also just click continue to see the albums recommended for
            me :)
          </span>
        </p>
      ) : (
        <p>
          <span>
            Click continue to use your remembered playlist, or paste a different
            playlist into the field below.
          </span>
          <br />
          <br />
          <span>
            To paste a different playlist, go to your Release Radar playlist in
            Spotify and click “Share” &gt; “Copy link to playlist”. Paste the
            link into the box below.
          </span>
        </p>
      )}

      <form>
        <input
          className="form-control"
          type="text"
          required
          onChange={onChangeFunction}
          placeholder={
            rememberedPlaylist
              ? "Click continue to use your playlist."
              : "Paste playlist link here (ie: https://open.spotify.com/playlist/" +
                defaultPlaylistId
          }
        ></input>
        <span className="playlist-entry__checkbox-container">
          <input
            className="form-check-input"
            type="checkbox"
            id="rememberPlaylist"
            checked={rememberPlaylist}
            onChange={(e) => setRememberPlaylist(e.target.checked)}
          />
          <label className="form-check-label" for="rememberPlaylist">
            Remember my playlist
          </label>
        </span>
        <Button onClick={clickFunction}>
          {isLoading && <span>Loading...</span>}
          {!isLoading && <span>Continue</span>}
        </Button>
        {showErrorMessage && (
          <Alert
            className="error-message"
            key={"danger"}
            variant={"danger"}
            onClose={() => {
              setShowErrorMessage(false);
            }}
            dismissible
          >
            There was an error getting your playlist. Make sure you copied the
            link correctly and try again.
          </Alert>
        )}
      </form>
    </div>
  );
};

export default PlaylistEntry;
