import axios from "axios";

//function to call netlify function which gets data from the Spotify API. In a seperate file to create mock function in test.
const getTracks = async (playlistId) => {
  const response = await axios.post("/.netlify/functions/getTracks/getTracks", {
    playlistId,
  });
  const tracks = response.data;
  console.log(response);
  return tracks;
};

export { getTracks };
