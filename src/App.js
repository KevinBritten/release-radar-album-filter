import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import SetupWrapper from "./components/SetupWrapper";
import ResultsScreen from "./components/ResultsScreen";
import NoResultsFound from "./components/NoResultsFound";

import "./styles/app.scss";

function App() {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState(null);

  const showResults = () => {
    if (!albums) return;
    else if (!albums.length) navigate.push("/no-results");
    else navigate.push("/results");
  };

  useEffect(showResults, [albums]);

  const loadAlbums = (data) => {
    setAlbums(() => data);
  };

  return (
    <div>
      <div className="site-wrapper">
        <Routes>
          <Route
            exact
            path="/"
            element={<SetupWrapper loadAlbums={loadAlbums} />}
          />
          <Route path="/results" element={<ResultsScreen albums={albums} />} />
          <Route path="/no-results" element={<NoResultsFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
