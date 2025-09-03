import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-xl font-bold text-blue-500 dark:text-blue-300">
        Welcome to Nativewind, Please use light mode to see the test!
      </Text>
    </SafeAreaView>
  );
}