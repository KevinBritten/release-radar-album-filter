import Button from "react-bootstrap/Button";

const PlaylistEntry = () => {
  return (
    <div>
      <p>
        Go to your Release Radar playlist in Spotify and click “Share” &gt;
        “Copy link to playlist”. Paste the link into the box below.
      </p>
      <input type="text" placeholder="Paste playlist link here"></input>
      <Button>Continue</Button>
    </div>
  );
};

export default PlaylistEntry;
