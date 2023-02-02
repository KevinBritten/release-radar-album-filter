import AlbumCard from "./AlbumCard";

import "../styles/results-screen.scss";

const ResultsScreen = ({ albums }) => {
  function joinArtists(artists) {
    return artists.reduce((previous, current) => {
      const separator = previous ? ", " : "";
      return previous + separator + current.name;
    }, "");
  }

  return (
    <div className="results-screen">
      <h1>Here are the albums we found for you:</h1>
      <div className="results-screen__cards-wrapper">
        {albums.map((a) => {
          const {
            images,
            name,
            total_tracks: trackCount,
            external_urls: { spotify: externalUrl },
            artists,
          } = a;
          return (
            <AlbumCard
              album={{
                images,
                name,
                trackCount,
                externalUrl,
                artist: joinArtists(artists),
              }}
              key={name}
            ></AlbumCard>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsScreen;
