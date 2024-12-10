"use client";

import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapByAddress = ({ address }: { address: string }) => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const fetchCoordinates = async (address: string) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );

      const result = await response.json();
      console.log(result)

      if (result.status === "OK") {
        const location = result.results[0].geometry.location;
        setCoordinates(location);
      } else {
        console.error("Error al obtener las coordenadas:", result.status);
      }
    } catch (error) {
      console.error("Error en la solicitud de geocodificación:", error);
    }
  };

  useEffect(() => {
    fetchCoordinates(address);
  }, [address]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      {coordinates ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={coordinates}
          zoom={15}
        >
          <Marker position={coordinates} />
        </GoogleMap>
      ) : (
        <p>Cargando mapa...</p>
      )}
    </LoadScript>
  );
};

export default MapByAddress;
