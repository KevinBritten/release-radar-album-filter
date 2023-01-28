import { useState } from "react";

import PlaylistEntry from "./components/PlaylistEntry";
import ResultsScreen from "./components/ResultsScreen";

function App() {
  const [albums, setAlbums] = useState(null);
  const loadAlbums = (data) => {
    console.log(data);
    setAlbums(() => data);
    console.log(albums);
  };

  return (
    <div>
      <h1>Start</h1>
      {!albums && <PlaylistEntry loadAlbums={loadAlbums} />}
      {albums && <ResultsScreen albums={albums}></ResultsScreen>}
    </div>
  );
}

export default App;
