import axios from "axios";

const getTracks = async (playlistId) => {
  console.log("sef");
  const response = await axios.post("/.netlify/functions/getTracks/getTracks", {
    playlistId,
  });
  const tracks = response.data;

  return tracks;
};

export { getTracks };
