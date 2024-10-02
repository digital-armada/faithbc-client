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

export default function MissionsMap({ missionaries }: { missionaries: any[] }) {
  const [coordinates, setCoordinates] = useState<
    Array<{
      latitude: number;
      longitude: number;
      id: number;
      name: string;
    }>
  >([]);
  const [error, setError] = useState<string | null>(null);

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const coords = await Promise.all(
          missionaries.map(async (missionary, i) => {
            const { location } = missionary;
            try {
              const coord = await getAddressCoordinates(location);
              return {
                ...coord,
                id: i,
                name: missionary.name,
              };
            } catch (err) {
              console.error(
                `Error fetching coordinates for ${missionary.name}:`,
                err,
              );
              return null;
            }
          }),
        );
        setCoordinates(
          coords.filter(
            (coord): coord is NonNullable<typeof coord> => coord !== null,
          ),
        );
      } catch (err) {
        setError("Failed to fetch coordinates. Please try again later.");
        console.error("Error fetching coordinates:", err);
      }
    };

    fetchCoordinates();
  }, [missionaries]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    return undefined; // Add this line to cover the case where typeof window === "undefined"
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API || ""}>
      <div className="h-[500px]">
        <Map
          defaultCenter={{ lat: -33.8688, lng: 151.2093 }}
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
const MarkerWithInfo = ({
  position,
  name,
}: {
  position: { lat: number; lng: number };
  name: string;
}) => {
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
