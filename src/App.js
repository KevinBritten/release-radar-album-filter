import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SetupWrapper from "./components/SetupWrapper";
import ResultsScreen from "./components/ResultsScreen";
import NoResultsFound from "./components/NoResultsFound";

import "./styles/app.scss";

function App() {
  const [albums, setAlbums] = useState(null);
  const showResults = () => {
    if (!albums.length) Window.history.push("/no-results");
    else Window.history.push("/results");
  };
  const loadAlbums = (data) => {
    setAlbums(() => data);
    showResults();
  };

  return (
    <div>
      <div className="site-wrapper">
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={<SetupWrapper loadAlbums={loadAlbums} />}
            />
            <Route
              path="/results"
              element={<ResultsScreen albums={albums} />}
            />
            <Route path="/no-results" element={<NoResultsFound />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
