import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GeoMap from "../../components/map/map";
import { getPlaces } from "../../store/slices/places";
const mock = [
  {
    lat: 39.940646,
    lng: 116.102009,
  },
  {
    lat: 60.54595,
    lng: 16.2841,
  },
  {
    lat: 3.6489578,
    lng: 18.6353764,
  },
  {
    lat: -13.734009,
    lng: -39.1478933,
  },
  {
    lat: 3.095417,
    lng: -76.1435915,
  },
  {
    lat: 32.904916,
    lng: 104.466646,
  },
  {
    lat: 54.9272788,
    lng: 41.1402811,
  },
  {
    lat: 52.56166,
    lng: 17.82264,
  },
  {
    lat: 32.8868129,
    lng: 36.0404049,
  },
  {
    lat: 33.011529,
    lng: 114.022298,
  },
  {
    lat: 47.6668709,
    lng: 38.076284,
  },
  {
    lat: 9.899259,
    lng: -84.0624815,
  },
  {
    lat: 37.1120141,
    lng: -93.3086778,
  },
  {
    lat: 22.714565,
    lng: 113.145504,
  },
  {
    lat: 22.6680599,
    lng: 113.2327987,
  },
  {
    lat: 6.8928179,
    lng: 125.1635402,
  },
  {
    lat: 5.6080848,
    lng: -54.398656,
  },
  {
    lat: -7.5816489,
    lng: 112.7539449,
  },
  {
    lat: 40.7046234,
    lng: 23.652122,
  },
  {
    lat: 64.00189,
    lng: 44.44513,
  },
];
function Home() {
  const dispatch = useDispatch();
  const { places, error, loading } = useSelector((state) => state.places);
  useEffect(() => {
    if (places?.length == 0) dispatch(getPlaces());
  }, [places]);
  return (
    <div className="home">
      <GeoMap positions={places} />
    </div>
  );
}

export default Home;
