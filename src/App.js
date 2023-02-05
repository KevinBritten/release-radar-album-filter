import { useState } from "react";

import SetupWrapper from "./components/SetupWrapper";
import ResultsScreen from "./components/ResultsScreen";
import NoResultsFound from "./components/NoResultsFound";

import "./styles/app.scss";

function App() {
  const [albums, setAlbums] = useState(null);
  const loadAlbums = (data) => {
    setAlbums(() => data);
  };

  return (
    <div>
      <div className="site-wrapper">
        {!albums && <SetupWrapper loadAlbums={loadAlbums} />}
        {albums && !albums.length && <NoResultsFound />}
        {albums && albums.length > 0 && <ResultsScreen albums={albums} />}
      </div>
    </div>
  );
}

export default App;
