import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, useUser } from "@clerk/clerk-expo";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { router } from "expo-router";
import GoogleTextInput from "@/components/GoogleTextInput";
import { useLocationStore } from "@/store";
import { useEffect, useState } from "react";
import { mockRides } from "@/constants/mockRides";
import Map from "@/components/Map";
import * as Location from "expo-location";

const Home = () => {
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [hasPermission, setHasPermission] = useState(false);
  const { user } = useUser();
  const { signOut } = useAuth();
  const loading = false;

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    // router.push("/(root)/find-ride");
  };

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    };
    requestLocation();
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-success-500">
      <FlatList
        // data={mockRides?.slice(0, 5)}
        data={[]}
        renderItem={({ item }) => <RideCard ride={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingBottom: 45,
        }}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-lg text-white font-JakartaBold">
                  No recent rides found
                </Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#fff" />
            )}
          </View>
        )}
        ListHeaderComponent={
          <>
            <View className="flex flex-row items-center justify-between my-2">
              <Text className="text-2xl font-JakartaExtraBold text-white">
                Welcome, {""}
                {user?.firstName ||
                  user?.emailAddresses[0].emailAddress.split("nk")[0]}{" "}
                👋 {""}
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>

            <GoogleTextInput
              icon={icons.search}
              // containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />

            <>
              <Text className="text-xl text-white font-JakartaBold my-3">
                Your current location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px] rounded-2xl overflow-hidden">
                <Map />
              </View>
            </>

            <Text className="text-xl text-white font-JakartaBold mt-5 mb-3">
              Recent Rides
            </Text>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Home;
