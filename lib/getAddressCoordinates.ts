import axios from "axios";

const getAddressCoordinates = async (address: string) => {
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json",
    {
      params: {
        address: address,
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
      },
    },
  );

  const { results } = response.data;
  if (results && results.length > 0) {
    const { lat, lng } = results[0].geometry.location;
    return { latitude: lat, longitude: lng };
  } else {
    throw new Error("No results found");
  }
};

export default getAddressCoordinates;
