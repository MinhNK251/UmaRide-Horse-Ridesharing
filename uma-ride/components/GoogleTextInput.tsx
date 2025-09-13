import { View, Image, StyleSheet } from "react-native";
import GooglePlacesTextInput from "react-native-google-places-textinput";

import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY!;

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle}`}
    >
      <GooglePlacesTextInput
        apiKey={googlePlacesApiKey}
        fetchDetails={true}
        placeHolderText={initialLocation ?? "Where do you want to go?"}
        debounceDelay={200}
        languageCode="en"
        onPlaceSelect={(place) => {
          if (place?.details?.geometry?.location) {
            handlePress({
              latitude: place.details.geometry.location.lat,
              longitude: place.details.geometry.location.lng,
              address: place.details.address,
            });
          }
        }}
        style={{
          container: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
          input: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : "white",
            fontSize: 16,
            fontWeight: "300",
            width: "100%",
            borderRadius: 200,
          },
          suggestionsList: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : "white",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
      />
    </View>
  );
};

export default GoogleTextInput;
