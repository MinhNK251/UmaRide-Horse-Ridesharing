import { Jockey, MarkerData } from "@/types/type";

const directionsAPI = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

// Generate random marker positions for jockeys around the user's current location
export const generateMarkersFromData = ({
  data,
  userLatitude,
  userLongitude,
}: {
  data: Jockey[];
  userLatitude: number;
  userLongitude: number;
}): MarkerData[] => {
  return data.map((jockey) => {
    // Create a small random offset to spread markers around user
    const latOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005
    const lngOffset = (Math.random() - 0.5) * 0.01;

    return {
      latitude: userLatitude + latOffset,
      longitude: userLongitude + lngOffset,
      title: `${jockey.first_name} ${jockey.last_name}`,
      ...jockey,
    };
  });
};

// Calculate the map region to display depending on user & destination positions
export const calculateRegion = ({
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
}) => {
  // If user location is not available, show default location (Tokyo)
  if (!userLatitude || !userLongitude) {
    return {
      latitude: 35.6895,
      longitude: 139.6917,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  // If only user location is available (no destination), focus on user
  if (!destinationLatitude || !destinationLongitude) {
    return {
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  // If both user and destination are available, center map between them
  const minLat = Math.min(userLatitude, destinationLatitude);
  const maxLat = Math.max(userLatitude, destinationLatitude);
  const minLng = Math.min(userLongitude, destinationLongitude);
  const maxLng = Math.max(userLongitude, destinationLongitude);
  // Calculate the span of the region (with 30% padding)
  const latitudeDelta = (maxLat - minLat) * 1.3; // Adding some padding
  const longitudeDelta = (maxLng - minLng) * 1.3;
  // Center point between user and destination
  const latitude = (userLatitude + destinationLatitude) / 2;
  const longitude = (userLongitude + destinationLongitude) / 2;

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
};

// Calculate travel time and price for each jockey marker based on their distance to the user and from the user to the destination.
export const calculateJockeyTimes = async ({
  markers,
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  markers: MarkerData[];
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
}) => {
  // Must have all coordinates to calculate time
  if (
    !userLatitude ||
    !userLongitude ||
    !destinationLatitude ||
    !destinationLongitude
  )
    return;

  try {
    // For each jockey marker, get travel times using Google Directions API
    const timesPromises = markers.map(async (marker) => {
      // Time from jockey to user
      const responseToUser = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${marker.latitude},${marker.longitude}&destination=${userLatitude},${userLongitude}&key=${directionsAPI}`,
      );
      const dataToUser = await responseToUser.json();
      const timeToUser = dataToUser.routes[0].legs[0].duration.value; // Time in seconds

      // Time from user to destination
      const responseToDestination = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=${directionsAPI}`,
      );
      const dataToDestination = await responseToDestination.json();
      const timeToDestination =
        dataToDestination.routes[0].legs[0].duration.value; // Time in seconds

      // Calculate total time (in minutes) and estimated price
      const totalTime = (timeToUser + timeToDestination) / 60;
      const price = (totalTime * 0.5).toFixed(2);

      return { ...marker, time: totalTime, price };
    });

    // Wait for all markers to finish calculating times
    return await Promise.all(timesPromises);
  } catch (error) {
    console.error("Error calculating jockey times:", error);
  }
};
