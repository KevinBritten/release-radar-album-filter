import "../styles/no-results-found.scss";

const NoResultsFound = () => {
  return (
    <div className="no-results-found">
      <h1>Sorry, no albums were found.</h1>
      <p>
        Either you provided a blank playlist or all the songs in the playlist
        are from singles.
      </p>
    </div>
  );
};

export default NoResultsFound;
