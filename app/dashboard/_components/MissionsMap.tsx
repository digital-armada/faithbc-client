"use client";

import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

import getAddressCoordinates from "@/lib/getAddressCoordinates";

export default function MissionsMap({ missionaries }) {
  const [coordinates, setCoordinates] = useState([]);

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const fetchCoordinates = async () => {
      const coords = await Promise.all(
        missionaries.map(async (missionary, i) => {
          const { location } = missionary;
          const coord = await getAddressCoordinates(location);
          return {
            ...coord,
            id: i,
            name: missionary.name,
          };
        }),
      );
      setCoordinates(coords);
    };

    fetchCoordinates();
  }, [missionaries]);

  useEffect(() => {
    // detect window size
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}>
      <div className="h-[500px]">
        <Map
          defaultCenter={{ lat: -33.8688, lng: 151.2093 }} // Default to Sydney's coordinates
          defaultZoom={windowSize.width >= 576 ? 1.5 : 1}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
          streetViewControl={false}
          mapTypeControl={false}
          fullscreenControl={false}
        >
          {coordinates.map((coord) => (
            <MarkerWithInfo
              key={coord.id}
              position={{ lat: coord.latitude, lng: coord.longitude }}
              name={coord.name}
            />
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}

const MarkerWithInfo = ({ position, name }) => {
  const [open, setOpen] = useState(false);

  return (
    <AdvancedMarker position={position} onClick={() => setOpen(true)}>
      <Pin background={"#0c87b8"} borderColor={"white"} glyphColor={"white"} />
      {open && (
        <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
          <p>{name}</p>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
};
