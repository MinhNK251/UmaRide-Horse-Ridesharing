import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";

const Home = () => {
  const { isSignedIn, isLoaded } = useAuth();

  // Show a loader until Clerk finishes restoring the session
  if (!isLoaded) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href={"/(root)/(tabs)/home"} />;
  }

  return <Redirect href={"/(auth)/onboarding"} />;
};

export default Home;
