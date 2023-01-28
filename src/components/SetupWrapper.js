import PlaylistEntry from "./PlaylistEntry";

const SetupWrapper = ({ loadAlbums }) => {
  return (
    <div>
      <h1>Get only the full album releases from your Release Radar.</h1>
      <PlaylistEntry loadAlbums={loadAlbums} />
    </div>
  );
};

export default SetupWrapper;
