import axios from "axios";

const getTracks = async () => {
  const response = await axios.get("/.netlify/functions/getTracks");
  const tracks = response.data;

  return tracks;
};

export { getTracks };
