import {
  calculateJockeyTimes,
  calculateRegion,
  generateMarkersFromData,
} from "@/lib/map";
import { useJockeyStore, useLocationStore } from "@/store";
import { Text } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { mockJockeys } from "@/constants/mockJockeys";
import { useEffect, useState } from "react";
import { MarkerData } from "@/types/type";
import { icons } from "@/constants";

const Map = () => {
  const { selectedJockey, setJockeys } = useJockeyStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  useEffect(() => {
    if (Array.isArray(mockJockeys)) {
      if (!userLatitude || !userLongitude) return;
      const newMarkers = generateMarkersFromData({
        data: mockJockeys,
        userLatitude,
        userLongitude,
      });
      setMarkers(newMarkers);
    }
  }, [userLatitude, userLongitude]);

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      style={{ width: "100%", height: "100%", borderRadius: 32 }}
      showsPointsOfInterest={false}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      {markers.map((marker, index) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedJockey === +marker.id ? icons.selectedMarker : icons.marker
          }
        />
      ))}

      {destinationLatitude && destinationLongitude && (
        <>
          <Marker
            key="destination"
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title="Destination"
            image={icons.pin}
          />
          {/* <MapViewDirections
            origin={{
              latitude: userLatitude!,
              longitude: userLongitude!,
            }}
            destination={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            apikey={directionsAPI!}
            strokeColor="#0286FF"
            strokeWidth={2}
          /> */}
        </>
      )}
    </MapView>
  );
};

export default Map;
