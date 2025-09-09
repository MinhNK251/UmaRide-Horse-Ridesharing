import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.replace("/(auth)/sign-in");
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Button title="Log out" onPress={handleLogout} />
    </SafeAreaView>
  );
};

export default Profile;
