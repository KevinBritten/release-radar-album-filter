import { useState } from "react";

import SetupWrapper from "./components/SetupWrapper";
import ResultsScreen from "./components/ResultsScreen";

function App() {
  const [albums, setAlbums] = useState(null);
  const loadAlbums = (data) => {
    setAlbums(() => data);
  };

  return (
    <div>
      {!albums && <SetupWrapper loadAlbums={loadAlbums} />}
      {albums && !albums.length && (
        <h1>
          Sorry, no albums were found. Either you provided a blank playlist or
          all the songs in the playlist are from singles.
        </h1>
      )}
      {albums && albums.length > 0 && (
        <ResultsScreen albums={albums}></ResultsScreen>
      )}
    </div>
  );
}

export default App;
