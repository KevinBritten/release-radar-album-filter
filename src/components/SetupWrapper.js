import PlaylistEntry from "./PlaylistEntry";

import "../styles/setup-wrapper.scss";

const SetupWrapper = ({ loadAlbums }) => {
  return (
    <div className="setup-wrapper">
      <h1>Get only the full album releases from your Release Radar.</h1>
      <PlaylistEntry loadAlbums={loadAlbums} />
    </div>
  );
};

export default SetupWrapper;
