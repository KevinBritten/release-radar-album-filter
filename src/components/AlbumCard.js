import Card from "react-bootstrap/Card";

const AlbumCard = ({ album }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <img
        src={album.images[0].url}
        srcSet={`${album.images[0].url} 640w,
         ${album.images[1].url} 300w,
         ${album.images[2].url} 64w`}
        sizes="(min-width: 1200px) 640px,
                (min-width: 800px) 300px,
                64px"
        alt={`Album artwork for ${album.name} by ${album.artist}`}
      />
      <Card.Body>
        <Card.Title>{album.name}</Card.Title>
        <Card.Subtitle>{album.artist}</Card.Subtitle>
        <Card.Text>Genre - {album.genre}</Card.Text>
        <Card.Text>{album.trackCount} Tracks</Card.Text>
        <Card.Link href={album.externalUrl}>Open in Spotify</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default AlbumCard;
