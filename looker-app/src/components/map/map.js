import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useGeolocated } from "react-geolocated";

function GeoMap({ positions = [], setPosition }) {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  // latitude: 35.8362217;
  // longitude: 10.6028225;
  const mapContainer = useRef(null);
  const [positionsRe, setPostions] = useState([
    ...positions,
    {
      lng: coords?.longitude || 10.6028225,
      lat: coords?.latitude || 35.8362217,
    },
  ]);
  const map = useRef(null);
  const [lng] = useState(10.6028225);
  const [lat] = useState(35.8362217);
  const [zoom] = useState(12);
  const [API_KEY] = useState("gAtNSepJNEfyMqVA5zCF");

  useEffect(() => {
    if (map.current) return; //stops map from intializing more than once
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    map?.current?.on("click", function (e) {
      setPosition(e.lngLat);
      const { lat, lng } = e.lngLat || {};
      setPostions([{ lng, lat }]);
    });
  }, []);

  useEffect(() => {
    positionsRe.forEach(({ lng, lat }) => {
      const marker = new maplibregl.Marker({ color: "#FF0000" })
        .setLngLat([lng, lat])
        .addTo(map.current);
    });
    console.log({ positionsRe });
  }, [positionsRe]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}

export default GeoMap;
