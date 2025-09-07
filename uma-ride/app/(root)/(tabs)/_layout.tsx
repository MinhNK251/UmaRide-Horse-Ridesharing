import "@/global.css";
import { Stack } from "expo-router";
import "react-native-reanimated";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
