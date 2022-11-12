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

  const mapContainer = useRef(null);
  const [positionsRe, setPostions] = useState([...positions]);
  const map = useRef(null);
  const [lng] = useState(10.6028225);
  const [lat] = useState(35.8362217);
  const [zoom] = useState(12);
  const [API_KEY] = useState("gAtNSepJNEfyMqVA5zCF");

  useEffect(() => {
    if (coords)
      new maplibregl.Marker({ color: "green" })
        .setLngLat([coords?.longitude, coords?.latitude])
        .addTo(map.current);
  }, [coords]);

  useEffect(() => {
    if (map.current) return; //stops map from intializing more than once
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}#15.9/35.72517/10.71610`,
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    map?.current?.on("click", function (e) {
      setPosition(e.lngLat);
      const { lat, lng } = e.lngLat || {};
      setPostions([{ lan: lng, lat }]);
    });
  }, []);

  useEffect(() => {
    console.log({ positionsRe });
    [...positionsRe]?.forEach((pos) => {
      const { lan, lat } = pos || {};
      if (lan && lat)
        new maplibregl.Marker({ color: "#FF0000" })
          .setLngLat([lan, lat])
          .addTo(map.current);
    });
  }, [positionsRe]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}

export default GeoMap;
