import axios from "axios";

const getTracks = async (playlistId) => {
  const response = await axios.post("/.netlify/functions/getTracks/getTracks", {
    playlistId,
  });
  //   const tracks = response.data;
  //   const response = await axios.get("/.netlify/functions/getTracks/getTracks");
  console.log(response);
  //   return tracks;
};

export { getTracks };
