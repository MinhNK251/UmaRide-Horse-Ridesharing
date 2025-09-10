import { Text } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const Map = () => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ width: "100%", height: "100%", borderRadius: 32 }}
    >
      <Text>Map</Text>
    </MapView>
  );
};

export default Map;
