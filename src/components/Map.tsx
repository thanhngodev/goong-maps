/* eslint-disable @typescript-eslint/no-loss-of-precision */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClearOutlined } from "@ant-design/icons";
import "@goongmaps/goong-js/dist/goong-js.css";
import ReactMapGL, {
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  Layer,
  Marker,
  NavigationControl,
  ScaleControl,
  Source
} from "@goongmaps/goong-map-react";
import { AutoComplete, Input } from "antd";
import { Feature, LineString, Point } from "geojson";
import polyline from "polyline";
import { useCallback, useEffect, useState } from "react";
import { goongApiKey, goongMapStyle, locations } from "../constants/constants";
import {
  fetchDirectionData,
  fetchDistanceMatrix,
  fetchPlaceAutoComplete,
  fetchPlaceDetails,
  findMin,
} from "../services/common";
import MarkerLocation from "./MarkerLocation";

const Map: React.FC = () => {
  const [viewport, setViewport] = useState({
    latitude: locations[0].latitude,
    longitude: locations[0].longitude,
    zoom: 12,
    transitionDuration: 0,
    transitionInterpolator: null,
  });

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLocation, setSearchLocation] = useState<any>(null);
  const [searchLocationStore, setSearchLocationStore] = useState<any>(null);
  const [coordinates, setCoordinates] = useState<number[][]>([]);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [milestones, setMilestones] = useState<any[]>([]);

  const handleSearch = useCallback(async (query: string) => {
    if (query) {
      setAutocompleteLoading(true);
      try {
        const data = await fetchPlaceAutoComplete(query);
        setSearchResults(data.predictions);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setAutocompleteLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  }, []);

  const handleSelect = async (value: string) => {
    try {
      const selected = searchResults.find(
        (result) => result.description === value
      );
      if (selected) {
        setSearchLocation(null);
        const data = await fetchPlaceDetails(selected.place_id);

        setViewport({
          ...viewport,
          zoom: 10,
          transitionDuration: 320,
        });

        setTimeout(() => {
          setViewport({
            ...viewport,
            latitude: data.lat,
            longitude: data.lng,
            zoom: 14,
            transitionDuration: 1000,
          });

          setSearchLocation({ latitude: data.lat, longitude: data.lng });
          setSearchResults([]);
        }, 1000);
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  useEffect(() => {
    const fetchRoute = async () => {
      if (searchLocation) {
        try {
          setSearchLocationStore(null);
          const dataDistanceMatrix = await fetchDistanceMatrix(
            `${searchLocation.latitude},${searchLocation.longitude}`,
            createDestinationsString
          );

          const elmDistanceMatrixList = dataDistanceMatrix.rows[0].elements;
          const { distanceResult, durationResult } = findMin(
            elmDistanceMatrixList
          );
          const locationStoreMin =
            locations[durationResult.index] || locations[0];

          setSearchLocationStore({
            store: locationStoreMin,
            value: durationResult.minItem,
          });

          setMilestones([
            {
              latitude: locationStoreMin.latitude,
              longitude: locationStoreMin.longitude,
              label: `${distanceResult.minItem.distance.text}\n${durationResult.minItem.duration.text}`,
            },
          ]);
        } catch (error) {
          console.error("Error fetching route:", error);
        }
      }
    };

    fetchRoute();
  }, [searchLocation]);

  useEffect(() => {
    const fetchDirection = async () => {
      if (searchLocationStore && searchLocationStore.store) {
        try {
          const data = await fetchDirectionData(
            searchLocation.latitude,
            searchLocation.longitude,
            searchLocationStore.store.latitude,
            searchLocationStore.store.longitude
          );
          console.log(searchLocationStore.value);

          const encodedPolyline = data.routes[0].overview_polyline.points;
          const decodedCoordinates = polyline.decode(encodedPolyline);
          setCoordinates(
            decodedCoordinates.map((coord) => [coord[1], coord[0]])
          );
        } catch (error) {
          console.error("Error fetching route:", error);
        }
      }
    };

    fetchDirection();
  }, [searchLocationStore]);

  const handleClear = () => {
    setSearchLocation(null);
    setSearchResults([]);
    setCoordinates([]);
    setMilestones([]);
  };

  const coordinatesToGeoJSON = (coords: number[][]): Feature<LineString> => ({
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: coords,
    },
    properties: {},
  });

  const milestonesToGeoJSON = (milestones: any[]): Feature<Point>[] =>
    milestones.map((milestone) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [milestone.longitude, milestone.latitude],
      },
      properties: {
        description: milestone.label,
      },
    }));

  const createDestinationsString =
    locations
      .map((location) => `${location.latitude},${location.longitude}`)
      .join("|") || "";

  return (
    <div>
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          position: "absolute",
          top: "0",
          right: "0",
          zIndex: 1000,
        }}
      >
        <AutoComplete
          size="large"
          style={{ width: 450, marginRight: 24 }}
          options={searchResults.map((result) => ({
            value: result.description,
          }))}
          onSelect={handleSelect}
          onSearch={(value) => {
            clearTimeout((window as any).searchTimeout);
            (window as any).searchTimeout = setTimeout(() => {
              handleSearch(value);
            }, 640);
          }}
        >
          <Input.Search
            addonBefore={<ClearOutlined onClick={handleClear} />}
            placeholder="Search location"
            size="large"
            loading={autocompleteLoading}
            enterButton={"Tìm Kiếm"}
          />
        </AutoComplete>
      </div>

      <ReactMapGL
        {...viewport}
        width={"100dvw"}
        height={"100dvh"}
        onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
        goongApiAccessToken={goongApiKey.maps}
        mapStyle={goongMapStyle.default}
      >
        <NavigationControl />
        <AttributionControl />
        <FullscreenControl />
        <GeolocateControl />
        <ScaleControl />
        {locations.map((location, index) => (
          <Marker
            key={index}
            latitude={location.latitude}
            longitude={location.longitude}
          >
            <MarkerLocation />
          </Marker>
        ))}

        {searchLocation && (
          <Marker
            latitude={searchLocation.latitude}
            longitude={searchLocation.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <MarkerLocation isLogo={false} />
          </Marker>
        )}

        {milestones.length > 0 && (
          <Source
            id="milestones"
            type="geojson"
            data={{
              type: "FeatureCollection",
              features: milestonesToGeoJSON(milestones),
            }}
          >
            <Layer
              id="milestone-labels"
              type="symbol"
              source="milestones"
              layout={{
                "icon-image": "marker-15",
                "icon-size": 2,
                "text-field": "{description}",
                "text-size": 14,
                "text-offset": [1, -3],
                "text-anchor": "top",
              }}
              paint={{
                "text-color": "#00935e",
              }}
            />
          </Source>
        )}
        {coordinates.length > 0 && (
          <Source
            id="route"
            type="geojson"
            data={coordinatesToGeoJSON(coordinates)}
          >
            <Layer
              id="route"
              type="line"
              source="route"
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color": "#0f53ff",
                "line-width": 6,
                "line-opacity": 1,
              }}
            />
          </Source>
        )}
      </ReactMapGL>
    </div>
  );
};

export default Map;
