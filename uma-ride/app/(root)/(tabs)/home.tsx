import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const Home = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.replace("/(auth)/sign-in");
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text>Home</Text>

      {/* Temporary Logout Button */}
      <Button title="Log out" onPress={handleLogout} />
    </SafeAreaView>
  );
};

export default Home;
